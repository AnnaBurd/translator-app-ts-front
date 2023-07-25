import { ReactNode, useState } from "react";
import ThemeContext, { TextEditorSettings } from "./ThemeContext";

/**
 * Context Provider is a React component that plays role of a parent that provides common Context to child components.
 */
const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [textEditorSettings, setTextEditorSettings] =
    useState<TextEditorSettings>({
      fontSize: 11,
      lineHeight: 1.7,
    });

  const updateNextEditorSettings = (newSettings: TextEditorSettings) => {
    setTextEditorSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <ThemeContext.Provider
      value={{
        textEditorSettings,
        updateNextEditorSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
