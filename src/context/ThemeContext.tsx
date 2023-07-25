import { createContext } from "react";

export type TextEditorSettings = {
  fontSize?: number | string;
  lineHeight?: number | string;
};

export interface ThemeContext {
  textEditorSettings: TextEditorSettings;
  updateNextEditorSettings: (newSettings: TextEditorSettings) => void;
}

/**
 * Context is accessible to all React components within <ContextProvider> parent, to access it use useContext() hook.
 */
const themeContextDefaults: ThemeContext = {
  textEditorSettings: {},
  updateNextEditorSettings: () => null,
};
const themeContext = createContext<ThemeContext>(themeContextDefaults);

export default themeContext;
