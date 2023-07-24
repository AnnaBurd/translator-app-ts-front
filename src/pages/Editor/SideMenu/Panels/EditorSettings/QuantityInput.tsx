const QuantityInput = () => {
  return (
    <div className="flex-shrink-0 flex-grow-0 ">
      <label htmlFor="Quantity" className="sr-only">
        Quantity
      </label>

      <div className="flex items-center gap-1 text-sm">
        <button
          type="button"
          className="h-10 w-3 leading-10 text-slate-600 transition hover:opacity-75"
        >
          −
        </button>

        <input
          type="number"
          id="Quantity"
          value={32}
          min={1}
          max={32}
          className="h-8 w-10 rounded border-[1px] border-slate-200 text-center text-xs"
        />

        <button
          type="button"
          className="h-10 w-3 text-sm leading-10 text-slate-600 transition hover:opacity-75"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
