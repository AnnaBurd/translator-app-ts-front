import { OutputBlockData } from "@editorjs/editorjs";
import { BlockData } from "../../../@types/doc";
import { Paragraph } from "../DocxManager/useDocxManager";

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

export const paragraphToOutputBlock = (
  paragraph: Paragraph
): OutputBlockData => {
  return {
    data: { text: paragraph.text },
    type: "paragraph",
  };
};
