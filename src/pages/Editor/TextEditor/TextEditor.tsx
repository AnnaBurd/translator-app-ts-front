import EditorJS, {
  BlockAddedEvent,
  BlockChangedEvent,
  BlockMovedEvent,
  BlockRemovedEvent,
  OutputBlockData,
} from "@editorjs/editorjs";

import { useCallback, useEffect, useRef, useState } from "react";

import { BlockMutationEvent } from "@editorjs/editorjs/types/events/block";

import copy from "copy-to-clipboard";

import { Doc } from "../../../@types/doc";
import { blockToOutputBlock, outputBlockToBlock } from "./helper";
import { initInputEditor, initOutputEditor } from "./init";
import useFetchPrivate from "../../../hooks/useFetchPrivate";

import "./TextEditor.sass";

type TextEditorProps = {
  document: Doc | null;
};

const TextEditor: React.FC<TextEditorProps> = ({ document }) => {
  const fetchPrivate = useFetchPrivate();

  const inputContainerRef = useRef<HTMLDivElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const inputEditorRef = useRef<EditorJS>();
  const outputEditorRef = useRef<EditorJS>();

  const [loadingBlock, setLoadingBlock] = useState<string>("");
  const [errorLoadingBlock, setErrorLoadingBlock] = useState<string>("");

  // Last snapshot of the document state as stored in the database
  const [inputBlocks, setInputBlocks] = useState<Array<OutputBlockData>>([]);
  const [outputBlocks, setOutputBlocks] = useState<Array<OutputBlockData>>([]);

  // Current changes in the document
  const newBlocksAdded = useRef<Array<string>>([]);
  const blocksChanged = useRef<Array<string>>([]);
  const blocksMoved = useRef<Array<string>>([]);
  const blocksDeleted = useRef<Array<string>>([]);

  // Follow current changes of the input text editor
  const handleEditorEvent = useCallback(
    (event: BlockMutationEvent) => {
      console.log("🎈 handleEditorEvent: BlockMutationEvent", event.type);

      if (event.type === "block-added") {
        console.log(
          "Add new block",
          event.detail.target.id,
          (event as BlockAddedEvent).detail.index
        );

        newBlocksAdded.current.push(event.detail.target.id);
      }

      if (event.type === "block-changed") {
        console.log(
          "Block changed",
          event.detail.target.id,
          (event as BlockChangedEvent).detail.index
        );

        // Handle corner case of changing placeholder paragraph, which does not fire a "block-added" event
        if (
          document?.content?.length === 0 &&
          newBlocksAdded.current.length === 0
        ) {
          console.log("First change in the document !");
          newBlocksAdded.current.push(event.detail.target.id);
        }

        // Ignore changes in new blocks or in already changed blocks
        if (
          !newBlocksAdded.current.includes(event.detail.target.id) &&
          !blocksChanged.current.includes(event.detail.target.id)
        ) {
          blocksChanged.current.push(event.detail.target.id);

          // Inform user that the corresponding translation block is outdated
          outputEditorRef.current?.blocks
            .getById(event.detail.target.id)
            ?.holder?.classList.add("changed-block");
        }
      }

      if (event.type === "block-removed") {
        // TODO: clear list of changes for this block?
        // Remove block from the list of new blocks if it was added and then deleted
        if (newBlocksAdded.current.includes(event.detail.target.id)) {
          newBlocksAdded.current.splice(
            newBlocksAdded.current.findIndex(
              (id) => id === event.detail.target.id
            ),
            1
          );
        } else {
          console.log(
            "Deleted block",
            event.detail.target.id,
            (event as BlockRemovedEvent).detail.index
          );

          blocksDeleted.current.push(event.detail.target.id);

          // Remove corresponding translation block from the output editor
          outputEditorRef.current?.blocks.delete(
            outputEditorRef.current?.blocks.getBlockIndex(
              event.detail.target.id
            )
          );
        }
      }

      if (event.type === "block-moved") {
        console.log(
          "🚀🚀🚀🚀 Moved block - not supported yet",
          event.detail.target.id,
          (event as BlockMovedEvent).detail
        );

        // TODO: optionally

        // Also move blocks in output
      }
    },
    [document]
  );

  const applyChangesHandler = async () => {
    console.log("🚀😶‍🌫️ APPLY CHANGES");
    console.log("New blocks added", newBlocksAdded.current);
    console.log("Blocks changed", blocksChanged.current);
    console.log("Blocks moved", blocksMoved.current);
    console.log("Blocks deleted", blocksDeleted.current);

    // Get full input content
    const currentEditorInput = (await inputEditorRef.current?.save())?.blocks;
    // const currentOutputEditorInput = (await outputEditorRef.current?.save())
    //   ?.blocks;
    if (!currentEditorInput) throw new Error("No input content");

    // Filter and apply changes (from top to bottom)
    const newInputBlocks: OutputBlockData[] = [];
    const newTranslatedBlocks: OutputBlockData[] = [];

    // Remove  all deleted blocks from the database, not to mess up the order
    if (blocksDeleted.current.length > 0) {
      console.log("Deleting blocks", blocksDeleted.current);

      try {
        await fetchPrivate(`docs/${document?.slug}`, "PATCH", {
          // block: null,
          blockIds: blocksDeleted.current,
          translationOption: "removeBlocks",
        });
      } catch (err) {
        console.log("ERROR DELETING BLOCKS FROM DB:", err);
        setErrorLoadingBlock("Error deleting blocks");
      }
    }

    for (const [index, block] of currentEditorInput.entries()) {
      console.log(block, index);

      // Add new block
      if (newBlocksAdded.current.includes(block.id as string)) {
        console.log("Added at index", block, index);

        try {
          setLoadingBlock(block.id as string);

          // Fetch translation
          const translatedBlock = await fetchPrivate(
            `docs/${document?.slug}`,
            "PATCH",
            {
              block: outputBlockToBlock(block),
              blockPositionIndex: index,
            }
          );

          console.log(
            "Got translation:",
            translatedBlock,
            "for block at index",
            index
          );

          const translatedBlockData = blockToOutputBlock(translatedBlock);

          // newTranslatedBlocks.push(translatedBlockData);

          outputEditorRef.current?.blocks.insert(
            "paragraph",
            { text: translatedBlockData.data.text },
            null,
            index,
            true,
            false,
            translatedBlockData.id
          );
        } catch (err) {
          console.log("ERROR FETCHING TRANSLATION:", err);
          setErrorLoadingBlock(block.id as string);
          break;
        }
      }

      // Update changed block
      if (blocksChanged.current.includes(block.id as string)) {
        console.log("Changed at index", block, index);

        // Fetch updated translation
        const translatedBlock = await fetchPrivate(
          `docs/${document?.slug}`,
          "PATCH",
          {
            block: outputBlockToBlock(block),
            translationOption: "editOriginalBlock",
          }
        );

        console.log(
          "Got translation:",
          translatedBlock,
          "for block at index",
          index
        );

        const translatedBlockData = blockToOutputBlock(translatedBlock);

        // newTranslatedBlocks.push(translatedBlockData);
        // outputEditorRef.current?.blocks.getById(block.id as string).r

        // Replate corresponding block in the output editor
        outputEditorRef.current?.blocks.insert(
          "paragraph",
          { text: translatedBlockData.data.text },
          null,
          index,
          true,
          true,
          translatedBlockData.id
        );
      }
    }

    // Update state snapshot
    // setInputBlocks((prev) => [...prev, ...newInputBlocks]);
    // setOutputBlocks((prev) => [...prev, ...newTranslatedBlocks]);

    // Clear current changes
    newBlocksAdded.current = [];
    blocksChanged.current = [];
    blocksMoved.current = [];
    blocksDeleted.current = [];
  };

  // Init text editors when document is loaded
  // TODO: optionally - init editors during document loading to speed up the process
  useEffect(() => {
    if (!inputEditorRef.current && !outputEditorRef.current && document) {
      const inputBlocks = (document as Doc)?.content?.map(blockToOutputBlock);
      const outputBlocks = (document as Doc)?.translationContent?.map(
        blockToOutputBlock
      );

      inputEditorRef.current = initInputEditor(
        inputContainerRef.current as HTMLDivElement,
        handleEditorEvent,
        inputBlocks
      );

      outputEditorRef.current = initOutputEditor(
        outputContainerRef.current as HTMLDivElement,
        outputBlocks
      );

      if (inputBlocks) setInputBlocks(inputBlocks);
      if (outputBlocks) setOutputBlocks(outputBlocks);
    }

    // TODO: destroy editors before navigating away?
  }, [document, handleEditorEvent]);

  // TODO: add copy to cliboard button

  return (
    <>
      <div className="grid gap-4 !text-sm max-md:h-[140vh] xl:grid-cols-2">
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
          {/* TODO: UNDO - REDO functionality */}
          {/* <button className="group relative inline-block border-e p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 focus:relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 opacity-80 hover:opacity-100"
            >
              <path
                fillRule="evenodd"
                d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-6 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity delay-300 duration-500 group-hover:opacity-100">
              Undo&nbsp;(Ctrl+Z)
            </span>
          </button>
          <button className="group relative inline-block border-e p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 focus:relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 opacity-80 hover:opacity-100"
            >
              <path
                fillRule="evenodd"
                d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-6 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity delay-300 duration-500 group-hover:opacity-100">
              Redo&nbsp;(Ctrl+Y)
            </span>
          </button> */}
          <button
            className="group relative inline-block border-e p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 focus:relative"
            onClick={async () => {
              console.log("COPY TO CLIPBOARD INPUT TEXT:");

              const inputBlockDivs =
                inputContainerRef.current?.querySelectorAll(".ce-paragraph");

              const text = Array.from(inputBlockDivs || [])
                .map((div) => div.textContent)
                .join("\n");

              console.log(text);

              // const cleanText = text ? decodeHtmlCharCodes(text) : "";

              copy(text);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 opacity-80 hover:opacity-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>

            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-6 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity delay-300 duration-500 group-hover:opacity-100">
              Copy to clipboard
            </span>
          </button>

          <button
            className="group relative inline-block border-e p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 focus:relative"
            onClick={async () => {
              console.log("COPY TO CLIPBOARD OUTPUT TEXT:");

              const inputBlockDivs =
                outputContainerRef.current?.querySelectorAll(".ce-paragraph");

              const text = Array.from(inputBlockDivs || [])
                .map((div) => div.textContent)
                .join("\n");

              console.log(text);

              // const cleanText = text ? decodeHtmlCharCodes(text) : "";

              copy(text);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 opacity-80 hover:opacity-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>

            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-6 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity delay-300 duration-500 group-hover:opacity-100">
              Copy translation to clipboard
            </span>
          </button>
        </span>

        <button
          onClick={applyChangesHandler}
          className="inline-block shrink-0 justify-self-center rounded-md border border-indigo-400 bg-indigo-400 px-4 py-2 text-xs font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300 disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
        >
          Generate AI Translation
        </button>
      </div>
    </>
  );
};

export default TextEditor;
