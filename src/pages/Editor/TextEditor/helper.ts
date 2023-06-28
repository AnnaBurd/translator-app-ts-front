import { OutputBlockData } from "@editorjs/editorjs";
import { BlockData } from "../../../@types/doc";

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
