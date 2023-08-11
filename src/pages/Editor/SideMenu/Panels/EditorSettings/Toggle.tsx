import { useState } from "react";

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    // console.log("clicked on toggle", " enabled = ", enabled);
    setEnabled((prev) => !prev);
  };

  return (
    <label
      htmlFor="AcceptConditions"
      className="relative h-6 w-10 cursor-pointer"
      onClick={handleClick}
    >
      <span
        className={`absolute inset-0 h-5 w-9 rounded-full  transition ${
          enabled ? "bg-indigo-500" : "bg-indigo-200"
        }`}
      ></span>

      <span
        className={`absolute inset-y-0 m-[0.2rem] h-3.5 w-3.5 rounded-full bg-white transition-all ${
          enabled ? "start-4" : "start-0"
        }`}
      ></span>
    </label>
  );
};

export default Toggle;
