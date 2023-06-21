import { useEffect, useRef, useState } from "react";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";

import "./editor.sass";

import useDataPrivate from "../../hooks/useDataPrivate";
import useFetchPrivate from "../../hooks/useFetchPrivate";

import {
  blockToOutputBlock,
  initInputEditor,
  initOutputEditor,
  outputBlockToBlock,
} from "./editor-helpers";
import { useParams } from "react-router-dom";
import { Doc } from "../../@types/doc";

export default function Editor() {
  // Load the document data
  const { docId } = useParams();
  const [document, isLoading, error] = useDataPrivate(`docs/${docId}`);
  console.log("Editor component render:", document, isLoading, error);

  const inputContainerRef = useRef<HTMLDivElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const inputEditorRef = useRef<EditorJS>();
  const outputEditorRef = useRef<EditorJS>();

  // TODO: do i need state here?
  const [inputBlocks, setInputBlocks] = useState<Array<OutputBlockData>>([]);
  const [outputBlocks, setOutputBlocks] = useState<Array<OutputBlockData>>([]);

  // Init text editors when document is loaded
  // TODO: consider init editors during document loading
  useEffect(() => {
    if (!inputEditorRef.current && !isLoading && document) {
      const inputBlocks = (document as Doc)?.content?.map(blockToOutputBlock);
      const outputBlocks = (document as Doc)?.translationContent?.map(
        blockToOutputBlock
      );

      inputEditorRef.current = initInputEditor(
        inputContainerRef.current as HTMLDivElement,
        inputBlocks
      );

      outputEditorRef.current = initOutputEditor(
        outputContainerRef.current as HTMLDivElement,
        outputBlocks
      );

      if (inputBlocks) setInputBlocks(inputBlocks);
      if (outputBlocks) setOutputBlocks(outputBlocks);
    }
  }, [document, isLoading]);

  const fetchPrivate = useFetchPrivate();
  const translateHandler = async () => {
    // New Blocks added:
    const currentEditorInput = (await inputEditorRef.current?.save())?.blocks;
    const newInputBlocks = currentEditorInput?.filter((currentInputBlock) => {
      return !inputBlocks.find((block) => block.id === currentInputBlock.id);
    });

    console.log("Previous state", inputBlocks);
    console.log("Current input", currentEditorInput);
    console.log("New input", newInputBlocks);

    if (newInputBlocks) {
      console.log("Translate and render new blocks");

      const newTranslatedBlocks: OutputBlockData[] = [];
      newInputBlocks.forEach(async (block) => {
        const translatedBlock = await fetchPrivate(`docs/${docId}`, "POST", {
          block: outputBlockToBlock(block),
        });

        const translatedBlockIndex =
          inputEditorRef.current?.blocks.getBlockIndex(block.id as string);

        console.log(
          "Got translation:",
          translatedBlock,
          "for block at index",
          translatedBlockIndex
        );

        const translatedBlockData = blockToOutputBlock(translatedBlock);

        newTranslatedBlocks.push(translatedBlockData);

        outputEditorRef.current?.blocks.insert(
          "paragraph",
          { text: translatedBlockData.data.text },
          null,
          inputEditorRef.current?.blocks.getBlockIndex(block.id as string),
          true,
          false,
          translatedBlockData.id
        );
      });

      // Update state
      setInputBlocks((prev) => [...prev, ...newInputBlocks]);
      setOutputBlocks((prev) => [...prev, ...newTranslatedBlocks]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="grid h-[80vh] grid-cols-2 grid-rows-1 gap-4  px-10 py-3">
        <div
          className="h-full overflow-x-hidden overflow-y-hidden rounded-md bg-slate-50 p-4"
          ref={inputContainerRef}
        ></div>
        <div
          className="h-full overflow-x-hidden overflow-y-hidden rounded-md bg-slate-50 p-4"
          ref={outputContainerRef}
        ></div>
      </div>
      <button className="m-6 bg-red-300" onClick={translateHandler}>
        CLICK TO TRANSLATE
      </button>
    </>
  );
}
