const Image = () => {
  return (
    <aside className="relative block h-16 bg-[--color-primary] lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt="Pattern"
        src="/hero.svg"
        className="absolute inset-0 h-full w-full object-cover object-left"
        style={{
          width: "125%",
          maxWidth: "170%",
          height: "112%",
          marginLeft: "-22%",
          marginTop: "-13%",
        }}
      />
    </aside>
  );
};

export default Image;
