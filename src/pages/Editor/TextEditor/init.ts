import EditorJS, { OutputBlockData, EditorConfig } from "@editorjs/editorjs";
import { BlockMutationEvent } from "@editorjs/editorjs/types/events/block";
// import Regenerate from "./tools/ExampleTool";

enum LogLevels {
  VERBOSE = "VERBOSE",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export function initInputEditor(
  containerDomNode: HTMLDivElement,
  onEditorEvent: (event: BlockMutationEvent) => void,
  blocks?: Array<OutputBlockData>
) {
  const data = { blocks: blocks || [] };

  const options: EditorConfig = {
    placeholder: "Type or paste your text here ...",
    data, // Initial document data as stored in the database - does not trigger onChange event
    defaultBlock: "paragraph",
    tools: {
      paragraph: {
        // inlineToolbar: ["bold", "italic", "Regenerate"], // Can add custom inline tools, e.g. select text and calculate how many tokens it costs
        // working example is in the tools/ExampleTool.ts
        inlineToolbar: [],
      },
      // Regenerate: {
      //   class: Regenerate, // Use classname to attach inline tool
      // },
    },
    onChange(_api, event) {
      // TODO: filter out events that do not change text content, e.g. use of "bold" or "italic" inline tool
      if (Array.isArray(event)) {
        event.forEach(onEditorEvent);
      } else {
        onEditorEvent(event);
      }
    },
    logLevel: LogLevels.ERROR,
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
    logLevel: LogLevels.ERROR,
  };

  return new EditorJS({ holder: containerDomNode, ...options });
}
