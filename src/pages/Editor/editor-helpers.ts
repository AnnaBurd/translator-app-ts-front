import EditorJS, { EditorConfig, OutputBlockData } from "@editorjs/editorjs";
import { BlockData } from "../../@types/doc";

export const blockToOutputBlock = (block: BlockData): OutputBlockData => {
  return {
    data: { text: block.text },
    type: "paragraph",
    id: block.blockId,
  };
};

export const outputBlockToBlock = (block: OutputBlockData): BlockData => {
  return {
    blockId: block.id,
    text: block.data.text,
  };
};

// TODO: fix data types
export function initInputEditor(
  containerDomNode: HTMLDivElement,
  blocks?: Array<OutputBlockData>
) {
  const data = { blocks: blocks || [] };

  const options: EditorConfig = {
    placeholder: "Type or paste your text here ...",
    data,
    // paste: true,
    // splitOnBlocks: true,
    tools: {},
    hideToolbar: true, // Note: does not work in current version, temporarily I hide it with css,
  };

  return new EditorJS({ holder: containerDomNode, ...options });
}
export function initOutputEditor(
  containerDomNode: HTMLDivElement,
  blocks?: Array<OutputBlockData>
) {
  const data = { blocks: blocks || [] };

  const options: EditorConfig = {
    data,
    tools: {},
    hideToolbar: true, // Note: does not work in current version, temporarily I hide it with css,
    readOnly: true, // Toggle with editor.readOnly.toggle();
  };

  return new EditorJS({ holder: containerDomNode, ...options });
}
