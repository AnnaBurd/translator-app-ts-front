import { createContext } from "react";
import { ScreenSize } from "../hooks/useScreenSize";

export type TextEditorSettings = {
  fontSize?: number | string;
  lineHeight?: number | string;
};

export interface ThemeContext {
  textEditorSettings: TextEditorSettings;
  updateNextEditorSettings: (newSettings: TextEditorSettings) => void;
  screenSize?: ScreenSize;
}

/**
 * Context is accessible to all React components within <ContextProvider> parent, to access it use useContext() hook.
 */
const themeContextDefaults: ThemeContext = {
  textEditorSettings: {},
  updateNextEditorSettings: () => null,
  screenSize: undefined,
};
const themeContext = createContext<ThemeContext>(themeContextDefaults);

export default themeContext;
