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
import Breadcrumbs from "./Breadcrumbs";
import SideMenu from "./SideMenu";

// TODO: add copy to cliboard button

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

  console.log(outputBlocks);

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
      <SideMenu></SideMenu>

      <div className="grid h-min w-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden py-6 pl-16 pr-2 sm:pl-20 sm:pr-6 md:h-screen md:pr-4">
        <div className="pb-4">
          <Breadcrumbs
            title={(document as Doc)?.title}
            lang={(document as Doc)?.lang}
            translationLang={(document as Doc)?.translationLang}
          ></Breadcrumbs>
        </div>
        <div className="grid gap-4 max-md:h-[140vh] xl:grid-cols-2">
          <div
            className="editor overflow-x-hidden overflow-y-scroll rounded-md bg-slate-50 p-4"
            ref={inputContainerRef}
          ></div>
          <div
            className="editor overflow-x-hidden overflow-y-scroll rounded-md bg-slate-50 p-4"
            ref={outputContainerRef}
          ></div>
        </div>
        <div className="mb-4 mt-4 grid grid-cols-2 grid-rows-1 max-[400px]:grid-cols-1   md:grid-cols-3">
          <span className="justify-self-end rounded-lg border border-slate-200 bg-transparent shadow-sm max-[400px]:mb-4 max-[400px]:justify-self-center">
            <button className="group relative inline-block border-e p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 focus:relative">
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
            </button>
          </span>

          <button
            onClick={translateHandler}
            className="inline-block shrink-0 justify-self-center rounded-md border border-indigo-400 bg-indigo-400 px-4 py-2 text-xs font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300 disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
          >
            Generate AI Translation
          </button>
        </div>
      </div>
    </>
  );
}
