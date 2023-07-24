import { motion } from "framer-motion";

type DropdownBtnProps = {
  isOpen: boolean;
};

const DropdownBtn: React.FC<DropdownBtnProps> = ({ isOpen }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ms-4 hidden h-5 w-5 text-slate-500 transition group-hover:text-slate-700 sm:block"
      viewBox="0 0 20 20"
      fill="currentColor"
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.1, ease: "backInOut" }}
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </motion.svg>
  );
};

export default DropdownBtn;
