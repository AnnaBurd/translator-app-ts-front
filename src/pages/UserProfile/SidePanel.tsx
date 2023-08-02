type SidePanelProps = {
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  registeredSince: Date;
};

const SidePanel: React.FC<SidePanelProps> = ({
  firstName,
  lastName,
  email,
  photo,
  registeredSince,
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-between gap-12">
      <div className="flex flex-col items-center justify-start">
        <p className="whitespace-no-wrap -mb-.5 text-center text-2xl font-bold tracking-tight text-slate-700">
          {firstName} {lastName}
        </p>
        <span className="mb-8 text-xs font-light tracking-wide text-[--color-primary]">
          {email}
        </span>
        <div className="mb-3 h-24 w-24">
          <img className="h-full w-full rounded-full" src={photo} alt="" />
        </div>
        <div className="inline-block cursor-pointer rounded-md border border-indigo-400 bg-indigo-400 px-3 py-1.5 text-xs font-normal text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300 disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200">
          {/* <div className="cursor-pointer overflow-hidden rounded-lg bg-slate-200 px-4 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-300 hover:text-slate-600"> */}
          {/* <input
          type="file"
          name="photo"
          onChange={() => {
            console.log("uploading photo");
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        /> */}
          Upload New Photo
        </div>
      </div>
      <div className="text-sm text-slate-600  ">
        Member since:{" "}
        <span className="font-bold tracking-tight">
          {registeredSince.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default SidePanel;
