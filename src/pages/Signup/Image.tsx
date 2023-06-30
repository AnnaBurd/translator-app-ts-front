const Image = () => {
  return (
    <aside className="pointer-events-none relative z-30 hidden h-full w-full overflow-clip bg-[--color-primary] max-xl:[clip-path:ellipse(100%_55%_at_48%_44%)] min-[500px]:block xl:order-last xl:col-span-6 xl:overflow-visible">
      <div className="absolute left-[-20%] top-[-85%] h-[250%] w-[125%] lg:left-[-8%] lg:top-[0%] lg:h-[100%] lg:w-[110%] xl:left-[-26%] xl:top-[-14%] xl:h-[116%] xl:w-[126%] 2xl:left-[-21%] 2xl:top-[-16%] 2xl:h-[120%] 2xl:w-[126%]">
        <img
          alt="Pattern"
          src="/hero.svg"
          className="h-full w-full object-cover object-left"
        />
      </div>
    </aside>
  );
};

export default Image;
