import EditorJS, {
  BlockAddedEvent,
  BlockChangedEvent,
  BlockRemovedEvent,
  OutputBlockData,
} from "@editorjs/editorjs";

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { BlockMutationEvent } from "@editorjs/editorjs/types/events/block";

import { Doc } from "../../../@types/doc";
import { blockToOutputBlock, outputBlockToBlock } from "./helper";
import { initInputEditor, initOutputEditor } from "./init";
import useFetchPrivate from "../../../hooks/useFetchPrivate";

import "./TextEditor.sass";
import GenerateControl from "./Controls/GenerateControl";
import CopyTranslation from "./Controls/CopyTranslation";
import CopyText from "./Controls/CopyText";
import { DocxDocument } from "../DocxManager/useDocxManager";
import ErrorNotification from "./Notifications/ErrorNotification";
import InfoNotification from "./Notifications/InfoNotification";
import ThemeContext from "../../../context/ThemeContext";

type TextEditorProps = {
  document: Doc | null;
  uploadedDocument?: DocxDocument | null;
};

const TextEditor: React.FC<TextEditorProps> = ({
  document,
  uploadedDocument,
}) => {
  // Reference containers for the input and output EditorJS
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  // Reference to the input and output EditorJS instances
  const inputEditorRef = useRef<EditorJS>();
  const outputEditorRef = useRef<EditorJS>();

  // Latest snapshot of the saved document state (as in the database) - for the undo/redo functionality
  // const [inputBlocks, setInputBlocks] = useState<Array<OutputBlockData>>([]);
  // const [outputBlocks, setOutputBlocks] = useState<Array<OutputBlockData>>([]);

  // Current changes in the document since the last snapshot
  const newBlocksAdded = useRef<Array<string>>([]);
  const blocksChanged = useRef<Array<string>>([]);
  const blocksDeleted = useRef<Array<string>>([]);

  // State of translation running
  const fetchPrivate = useFetchPrivate();
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [errorLoadingTranslation, setErrorLoadingTranslation] = useState("");
  const [currentlyWorkingOn, setCurrentlyWorkingOn] = useState<string>("");
  const hasRunOutTokens = errorLoadingTranslation.includes("tokens");

  // Text editor view settings
  const { textEditorSettings } = useContext(ThemeContext);
  const { fontSize, lineHeight } = textEditorSettings;

  // TODO: fix error of new document not having title(should be untitled-xvxcv)

  // Listen to the events of the input editor to track changes in input blocks since the last save
  const trackEditorJSEvent = useCallback(
    (event: BlockMutationEvent) => {
      const handleBlockAdded = (event: BlockAddedEvent) => {
        newBlocksAdded.current.push(event.detail.target.id);
      };

      const handleBlockChanged = (event: BlockChangedEvent) => {
        // Handle corner case of changing placeholder paragraph, which does not fire a "block-added" event and instead fires a "block-changed" event
        if (
          document?.content?.length === 0 &&
          newBlocksAdded.current.length === 0
        )
          return handleBlockAdded(event as BlockAddedEvent);

        // Ignore changes in new blocks or in already changed blocks
        if (
          newBlocksAdded.current.includes(event.detail.target.id) ||
          blocksChanged.current.includes(event.detail.target.id)
        )
          return;

        // Add block id to the list of changed blocks
        blocksChanged.current.push(event.detail.target.id);

        // Inform user that the corresponding translation block is outdated
        outputEditorRef.current?.blocks
          .getById(event.detail.target.id)
          ?.holder?.classList.add("changed-block");
      };

      const handleBlockRemoved = (event: BlockRemovedEvent) => {
        // Remove newly added block (if it was added and then deleted)
        if (newBlocksAdded.current.includes(event.detail.target.id)) {
          newBlocksAdded.current.splice(
            newBlocksAdded.current.findIndex(
              (id) => id === event.detail.target.id
            ),
            1
          );
          return;
        }

        // For not new blocks, add block to the list of deleted blocks and immediately remove corresponding output block
        blocksDeleted.current.push(event.detail.target.id);

        // Also remove deleted block from the list of the changed blocks (if it was changed and then deleted)
        if (blocksChanged.current.includes(event.detail.target.id))
          blocksChanged.current.splice(
            blocksChanged.current.findIndex(
              (id) => id === event.detail.target.id
            ),
            1
          );

        // Remove corresponding translation block from the output editor
        outputEditorRef.current?.blocks.delete(
          outputEditorRef.current?.blocks.getBlockIndex(event.detail.target.id)
        );
      };

      switch (event.type) {
        case "block-added":
          handleBlockAdded(event as BlockAddedEvent);
          break;
        case "block-changed":
          handleBlockChanged(event as BlockChangedEvent);
          break;
        case "block-moved":
          // Ignore - not supported
          break;
        case "block-removed":
          handleBlockRemoved(event as BlockRemovedEvent);
          break;
        default:
        // console.log("🎈 trackEditorJSEvent: Unhandled event", event.type);
      }
    },
    [document]
  );

  // Given the list of current changes (new blocks, changed blocks, deleted blocks), correspondingly update the document in the database and render the output results. Finally, clear list of changes and update the state snapshot.
  const applyChangesHandler = async () => {
    // console.log("🚀😶‍🌫️ APPLY CURRENT CHANGES");
    // console.log("Blocks added", newBlocksAdded.current);
    // console.log("Blocks changed", blocksChanged.current);
    // console.log("Blocks deleted", blocksDeleted.current);

    const newBlocks = newBlocksAdded.current;
    const changedBlocks = blocksChanged.current;
    const deletedBlocks = blocksDeleted.current;

    // Ignore if there are no current changes
    if (
      newBlocks.length === 0 &&
      changedBlocks.length === 0 &&
      deletedBlocks.length === 0
    )
      return;

    // Set loading state
    let errorApplyingChanges = "";
    setErrorLoadingTranslation("");
    setIsLoadingTranslation(true);

    // Get current content of the input editor
    const currentEditorInput = (await inputEditorRef.current?.save())?.blocks;
    if (!currentEditorInput) {
      setErrorLoadingTranslation(
        "errorApplyingChanges: Could not get input editor content"
      );
      setIsLoadingTranslation(false);
      return;
    }

    // First, delete all removed blocks in the database, this guarantees that positions of the blocks are preserved correctly
    if (deletedBlocks.length > 0) {
      try {
        await fetchPrivate(`docs/${document?.slug}`, "PATCH", {
          blockIds: blocksDeleted.current,
          translationOption: "removeBlocks",
        });
        blocksDeleted.current = [];
      } catch (e) {
        // console.log("Could not remove blocks from the database", e);
        errorApplyingChanges = "Could not remove blocks from the database";
      }
    }
    if (errorApplyingChanges) {
      setErrorLoadingTranslation(errorApplyingChanges);
      setIsLoadingTranslation(false);
      return;
    }

    // Go through input blocks from top to bottom, and apply new changes, sequentially (can be optimized by batching, but not necessary for now)
    // Note usage of for-of loop to use async-await inside the loop

    const applyChangesToNewBlock = async (
      block: OutputBlockData,
      positionIndex: number
    ) => {
      // Update loading state
      setCurrentlyWorkingOn(
        `Generating translation for paragraph ${positionIndex + 1} of ${
          currentEditorInput.length
        }`
      );

      // Save block to the database and fetch translation from the server
      const translatedBlock = await fetchPrivate(
        `docs/${document?.slug}`,
        "PATCH",
        {
          block: outputBlockToBlock(block),
          blockPositionIndex: positionIndex,
        }
      );

      // Modify translation data so it can be used to render the output block
      const translatedBlockData = blockToOutputBlock(translatedBlock);

      // Immediately Render translated block in the output editor
      outputEditorRef.current?.blocks.insert(
        "paragraph",
        { text: translatedBlockData.data.text },
        null,
        positionIndex,
        true,
        false,
        translatedBlockData.id
      );

      // Remove block from the list of changes
      // Note: this operation is costly, but allows to resume application of changes in case of an error / stop by the user
      newBlocksAdded.current.splice(
        newBlocksAdded.current.indexOf(block.id as string),
        1
      );
    };

    const applyChangesToUpdatedBlock = async (
      block: OutputBlockData,
      positionIndex: number
    ) => {
      // Update loading state
      setCurrentlyWorkingOn(
        `Updating translation for paragraph ${positionIndex + 1} of ${
          currentEditorInput.length
        }`
      );

      // Save block to the database and fetch translation from the server
      const translatedBlock = await fetchPrivate(
        `docs/${document?.slug}`,
        "PATCH",
        {
          block: outputBlockToBlock(block),
          translationOption: "editOriginalBlock",
        }
      );

      // Modify translation data so it can be used to render the output block
      const translatedBlockData = blockToOutputBlock(translatedBlock);

      // Immediately replace corresponding block in the output editor
      outputEditorRef.current?.blocks.insert(
        "paragraph",
        { text: translatedBlockData.data.text },
        null,
        positionIndex,
        true,
        true,
        translatedBlockData.id
      );

      // Remove block from the list of changes
      // Note: this operation is costly, but allows to resume application of changes in case of an error / stop by the user
      blocksChanged.current.splice(
        blocksChanged.current.indexOf(block.id as string),
        1
      );
    };

    for (const [index, block] of currentEditorInput.entries()) {
      // Check if block was added or changed
      const isNewBlock = newBlocksAdded.current.includes(block.id as string);
      const isUpdatedBlock =
        !isNewBlock && blocksChanged.current.includes(block.id as string);
      if (!isNewBlock && !isUpdatedBlock) continue;

      // console.log("📝 Applying changes to block", block, " at index ", index);

      try {
        if (isNewBlock) await applyChangesToNewBlock(block, index);
        if (isUpdatedBlock) await applyChangesToUpdatedBlock(block, index);
      } catch (e) {
        // console.log("💥Could not apply changes to new block or edit block", e);
        errorApplyingChanges =
          (e as Error).message || "Could not apply changes to block";
        break;
      }
    }

    if (errorApplyingChanges) {
      setErrorLoadingTranslation(errorApplyingChanges);
      setIsLoadingTranslation(false);
      return;
    }

    // Could update changes without errors, now update state snapshot and clear list of current changes (if any are left)
    newBlocksAdded.current = [];
    blocksChanged.current = [];
    blocksDeleted.current = [];
    setCurrentlyWorkingOn("");

    // setInputBlocks((prev) => [...prev, ...newInputBlocks]);
    // setOutputBlocks((prev) => [...prev, ...newTranslatedBlocks]);
    setIsLoadingTranslation(false);
  };

  // After the document is loaded from the database, intitialize the input and output editors and fill them with initial document content
  // TODO: optionally - init editors during document loading to speed up the process
  useEffect(() => {
    if (!inputEditorRef.current && !outputEditorRef.current && document) {
      const inputBlocks = (document as Doc)?.content?.map(blockToOutputBlock);
      const outputBlocks = (document as Doc)?.translationContent?.map(
        blockToOutputBlock
      );

      inputEditorRef.current = initInputEditor(
        inputContainerRef.current as HTMLDivElement,
        trackEditorJSEvent,
        inputBlocks
      );

      outputEditorRef.current = initOutputEditor(
        outputContainerRef.current as HTMLDivElement,
        outputBlocks
      );

      // If the document was just uploaded, fill the input editor with the uploaded document content
      const addUploadedBlocks = async () => {
        const paragraphs = uploadedDocument?.paragraphs;

        await inputEditorRef.current?.isReady;
        // console.log("🎉🎉 Input Editor is ready to work");
        // console.log(
        //   "🎉🎉 And there are uploaded paragraphs to add",
        //   paragraphs
        // );

        paragraphs?.forEach((par, index) => {
          inputEditorRef.current?.blocks.insert(
            "paragraph",
            { text: par.text },
            null,
            index
          );
        });
      };

      if (uploadedDocument) {
        addUploadedBlocks();
      }

      // Update current shapshot of the editors state
      // if (inputBlocks) setInputBlocks(inputBlocks);
      // if (outputBlocks) setOutputBlocks(outputBlocks);
    }

    // TODO: destroy editors before navigating away?
  }, [document, trackEditorJSEvent, uploadedDocument]);

  // TODO : highlignt selected block and corresponding translation block

  return (
    <>
      <div
        className="grid gap-4 !text-sm max-md:h-[140vh] xl:grid-cols-2 2xl:gap-10"
        style={
          {
            "--text-editor-line-height": `${lineHeight}em`,
            "--text-editor-font-size": `${fontSize}pt`,
          } as React.CSSProperties
        }
      >
        <div
          className="editor input-editor overflow-x-hidden overflow-y-scroll rounded-md bg-slate-50 p-4"
          ref={inputContainerRef}
        ></div>
        <div
          className="editor output-editor overflow-x-hidden overflow-y-scroll rounded-md bg-slate-50 p-4"
          ref={outputContainerRef}
        ></div>
      </div>
      <div className="mb-4 mt-4 grid grid-cols-2 grid-rows-1 max-[400px]:grid-cols-1   md:grid-cols-3">
        <span className="justify-self-end rounded-lg border border-slate-200 bg-transparent shadow-sm max-[400px]:mb-4 max-[400px]:justify-self-center">
          <CopyText editorInputContainerRef={inputContainerRef} />

          <CopyTranslation editorTranslationContainerRef={outputContainerRef} />
        </span>

        <GenerateControl
          onClick={applyChangesHandler}
          isFirstGeneration={
            document?.content?.length === 0 ||
            blocksChanged.current.length === 0
          }
          isDisabled={hasRunOutTokens || isLoadingTranslation}
          isLoading={isLoadingTranslation}
          errorMessage={errorLoadingTranslation}
          currentInfoMessage={currentlyWorkingOn}
        />
      </div>
      <div className="relative flex h-8 justify-center ">
        <InfoNotification
          key="info-notification"
          message={errorLoadingTranslation ? "" : currentlyWorkingOn}
        />

        <ErrorNotification
          key="error-notification"
          message={errorLoadingTranslation}
        />
      </div>
    </>
  );
};

export default TextEditor;
