import EditorJS, { OutputBlockData, EditorConfig } from "@editorjs/editorjs";
import { BlockMutationEvent } from "@editorjs/editorjs/types/events/block";
import Regenerate from "./tools/ExampleTool";

export function initInputEditor(
  containerDomNode: HTMLDivElement,
  onEditorEvent: (event: BlockMutationEvent) => void,
  blocks?: Array<OutputBlockData>
) {
  console.log("INIT INPUT EDITOR");
  const data = { blocks: blocks || [] };

  const options: EditorConfig = {
    placeholder: "Type or paste your text here ...",
    data,
    defaultBlock: "paragraph",
    // splitOnPaste: false,
    tools: {
      paragraph: {
        // inlineToolbar: ["bold", "italic", "Regenerate"],
        inlineToolbar: [],
      },
      Regenerate: {
        class: Regenerate,
      },
    },
    onChange(_api, event) {
      // TODO: filter out events that do not change text content, e.g. use of "bold" or "italic" inline tool
      if (Array.isArray(event)) {
        event.forEach(onEditorEvent);
      } else {
        onEditorEvent(event);
      }
    },
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
