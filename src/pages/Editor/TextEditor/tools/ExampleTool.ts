import { InlineTool } from "@editorjs/editorjs";

class Regenerate implements InlineTool {
  button: HTMLButtonElement | null;
  state: boolean;
  api: EditorJS.API;

  static get isInline() {
    return true;
  }

  constructor({ api }: { api: EditorJS.API }) {
    this.api = api;
    this.button = null;
    this.state = false;

    // console.log("INLINE GTOOL API", api);
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    // this.button.textContent = "REGENERATE";
    this.button.innerHTML =
      '<svg width="20" height="18"><path d="M10.458 12.04l2.919 1.686-.781 1.417-.984-.03-.974 1.687H8.674l1.49-2.583-.508-.775.802-1.401zm.546-.952l3.624-6.327a1.597 1.597 0 0 1 2.182-.59 1.632 1.632 0 0 1 .615 2.201l-3.519 6.391-2.902-1.675zm-7.73 3.467h3.465a1.123 1.123 0 1 1 0 2.247H3.273a1.123 1.123 0 1 1 0-2.247z"/></svg>';
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  wrap(range: Range) {
    // console.log("WRAP RANGE", range);

    const selectedText = range.extractContents();

    // TODO: replace with regenerate functionality
    const mark = document.createElement("MARK");

    mark.appendChild(selectedText);
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range: Range) {
    const mark = this.api.selection.findParentTag("MARK");
    const text = range.extractContents();

    mark?.remove();

    range.insertNode(text);
  }

  surround(range: Range) {
    if (this.state) {
      // If highlights is already applied, do nothing for now
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  checkState(selection: Selection) {
    console.log("CHECK STATE", selection);
    // const text = selection.anchorNode;

    // if (!text) {
    //   return false;
    // }

    // const anchorElement = text instanceof Element ? text : text.parentElement;

    // this.state = !!anchorElement?.closest("MARK");
    // return this.state;

    const mark = this.api.selection.findParentTag("MARK");
    this.state = !!mark;
    return this.state; // Tool already applied for selection/ not yet applied, e.g. for marker highlight
  }
}

export default Regenerate;
