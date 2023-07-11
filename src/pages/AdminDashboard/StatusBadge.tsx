const blockedSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="-ms-1 me-1.5 h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

const activeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="-ms-1 me-1.5 h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const inactiveSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="-ms-1 me-1.5 h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L15 9M9 9l6.5 6.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

type StatusBadgeProps = {
  status: "active" | "inactive" | "blocked";
};
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorStyle = "bg-slate-100 text-slate-700";
  let statusSvg = inactiveSvg;
  let statusText = "Inactive";

  if (status === "active") {
    colorStyle = "bg-emerald-100 text-emerald-700";
    statusSvg = activeSvg;
    statusText = "Active";
  }

  if (status === "blocked") {
    colorStyle = "bg-red-100 text-red-700";
    statusSvg = blockedSvg;
    statusText = "Blocked";
  }

  return (
    <span
      className={
        `inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ` +
        colorStyle
      }
    >
      {statusSvg}

      <p className="whitespace-nowrap text-sm">{statusText}</p>
    </span>
  );
};

export default StatusBadge;
