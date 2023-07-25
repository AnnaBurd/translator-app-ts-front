import { Variants, AnimatePresence, motion } from "framer-motion";
import Toggle from "./Toggle";
import QuantityInput from "./QuantityInput";
import { TextEditorSettings } from "../../../Editor";

type EditorSettingsPanelProps = {
  isOpen: boolean;
  textEditorSettings: TextEditorSettings;
  setTextEditorSettings: (newSettings: TextEditorSettings) => void;
};

// Framer Motion animation variants for dropdown menu opening and closing
const menuVariants = {
  closed: {
    scale: 0.3,
    opacity: 0,
    translateY: "-20%",
    translateX: "-20%",
    transition: { duration: 0.15, ease: "easeIn", delay: 0.05 },
  },
  open: {
    scale: 1,
    opacity: 1,
    translateY: 0,
    translateX: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
} satisfies Variants;

const EditorSettingsPanel: React.FC<EditorSettingsPanelProps> = ({
  isOpen,
  textEditorSettings,
  setTextEditorSettings,
}) => {
  // TODO: store settings and theme (in local storage per user?)

  const { fontSize, lineHeight } = textEditorSettings;

  const lineHeightStep = 0.1;
  const lineHeightMin = 1.0;
  const lineHeightMax = 5.0;
  const fontSizeStep = 1;
  const fontSizeMin = 5;
  const fontSizeMax = 24;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute bottom-0 left-16  z-50 mt-2 w-56 min-w-fit select-none divide-y divide-slate-100 rounded-md border border-slate-100 bg-white px-1 py-0.5 shadow-lg dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="closed"
          variants={menuVariants}
        >
          <div className="p-2 px-4">
            <h4 className="pb-6 pt-1 text-base font-semibold">
              Editor Settings
            </h4>
            <div className="flex justify-between pr-3.5 text-sm">
              <span className=" ">Dark Theme</span>
              <Toggle />
            </div>
          </div>
          <div className="p-2 px-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="">Font Size</span>
              <QuantityInput
                value={fontSize}
                props={{
                  min: fontSizeMin,
                  max: fontSizeMax,
                  step: fontSizeStep,
                  precision: 0,
                }}
                onValueChange={(value) => {
                  setTextEditorSettings({ fontSize: value });
                }}
              />
            </div>
          </div>
          <div className="p-2 px-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="">Line Spacing</span>
              <QuantityInput
                value={lineHeight}
                props={{
                  min: lineHeightMin,
                  max: lineHeightMax,
                  step: lineHeightStep,
                  precision: 1,
                }}
                onValueChange={(value) => {
                  setTextEditorSettings({ lineHeight: value });
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditorSettingsPanel;
