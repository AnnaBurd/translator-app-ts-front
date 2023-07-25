import { AnimatePresence, Variants, motion } from "framer-motion";
import MenuItem from "./MenuItem";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  // onOpen: () => void;
  // onSignout: (event: FormEvent<HTMLFormElement>) => void;
};

const menuVariants = {
  closed: {
    scale: 0.3,
    opacity: 0,
    translateY: "-40%",
    translateX: "20%",
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

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const handleRename = () => {
    console.log("Rename");
  };
  const handleDuplicate = () => {
    console.log("Duplicate");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed left-0 top-0 z-[250] h-screen w-screen"
            onClick={onClose}
          ></div>
          <motion.div
            className="absolute -end-2 top-4 z-[250] mt-2 w-32 min-w-fit divide-y divide-slate-100 rounded-md border border-slate-100 bg-white shadow-lg dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900 "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            exit="closed"
            variants={menuVariants}
          >
            <div className="p-2">
              <MenuItem
                onClick={handleRename}
                svgIconPath={
                  "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                }
              >
                Rename
              </MenuItem>

              <MenuItem
                onClick={handleDuplicate}
                svgIconPath={
                  "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                }
              >
                Duplicate
              </MenuItem>

              <MenuItem
                onClick={handleDelete}
                svgIconPath={
                  "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                }
              >
                Delete
              </MenuItem>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;
