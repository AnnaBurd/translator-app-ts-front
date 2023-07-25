import { motion } from "framer-motion";

type DropdownBtnProps = {
  isOpen: boolean;
  props?: {
    strokeWidth: number;
    size: number;
  };
};

const DropdownBtn: React.FC<DropdownBtnProps> = ({ isOpen, props }) => {
  const { strokeWidth, size } = props || { strokeWidth: 4, size: 3 };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={`hidden  text-slate-400  transition-colors group-hover:text-slate-700 sm:block w-${size} h-${size}`}
      initial={{ rotate: 90 }}
      animate={{ rotate: isOpen ? 270 : 90 }}
      transition={{ duration: 0.3, ease: "backInOut" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </motion.svg>
  );
};

export default DropdownBtn;
