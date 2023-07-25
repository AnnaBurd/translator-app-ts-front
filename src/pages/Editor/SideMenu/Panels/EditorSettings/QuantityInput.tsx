import { useState } from "react";

type QuantityInputProps = {
  value?: number | string;
  props?: {
    min: number;
    max: number;
    step: number;
    precision: number;
  };
  onValueChange?: (value: number | string) => void;
};

const QuantityInput: React.FC<QuantityInputProps> = ({
  value = 0,
  props,
  onValueChange,
}) => {
  const [currentValue, setCurentValue] = useState(value);

  const inputProperties = props || { min: 0, max: 99, step: 1, precision: 0 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurentValue(e.target.value);
  };

  const handleBlur = () => {
    let enteredValue: string | number = +currentValue;
    if (enteredValue < inputProperties.min) enteredValue = inputProperties.min;
    if (enteredValue > inputProperties.max) enteredValue = inputProperties.max;

    onValueChange?.(enteredValue);
    setCurentValue(enteredValue);
  };

  const handleIncrement = () => {
    if (+value >= inputProperties.max) return;

    const newValue = (+value + inputProperties.step).toFixed(props?.precision);
    onValueChange?.(newValue);
    setCurentValue(newValue);
  };

  const handleDecrement = () => {
    if (+value <= inputProperties.min) return;
    const newValue = (+value - inputProperties.step).toFixed(props?.precision);
    onValueChange?.(newValue);
    setCurentValue(newValue);
  };

  return (
    <div className="flex-shrink-0 flex-grow-0 ">
      <label htmlFor="Quantity" className="sr-only">
        Quantity
      </label>

      <div className="flex items-center gap-1 text-sm">
        <button
          type="button"
          className="h-10 w-3 leading-10 text-slate-600 transition hover:opacity-75"
          onClick={handleDecrement}
        >
          −
        </button>

        <input
          type="number"
          id="Quantity"
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          {...inputProperties}
          className="h-8 w-10 rounded border-[1px] border-slate-200 text-center text-xs"
        />

        <button
          type="button"
          className="h-10 w-3 text-sm leading-10 text-slate-600 transition hover:opacity-75"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
