import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AnimatedPage from "../../components/animations/AnimatedPage";

const ErrorPage = () => {
  const [searchParams] = useSearchParams();

  const errorType = searchParams.get("type");

  const navigate = useNavigate();
  const location = useLocation();

  let errorMessage;
  let errorStatus;

  switch (errorType) {
    case "not-authorized":
      errorMessage = "You are not authorized to view this page.";
      errorStatus = 403;
      break;
    case "not-found":
      errorMessage = "We can't find that page.";
      errorStatus = 404;
      break;
    case "user-not-found":
      errorMessage = "We can't find your profile.";
      errorStatus = 404;
      break;
    case "document-not-found":
      errorMessage = "We can't open that document.";
      errorStatus = 404;
      break;
    case "server-error":
      errorMessage = "Something went wrong on our end.";
      errorStatus = 500;
      break;
    default:
      errorMessage = "We can't find that page.";
      errorStatus = 404;
      break;
  }

  return (
    <AnimatedPage>
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center">
          <h1 className="text-7xl font-black text-indigo-200 md:text-9xl">
            {errorStatus}
          </h1>

          <p className="text-lg font-bold tracking-tight text-slate-900  md:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-xs text-slate-500 md:text-base">
            {errorMessage}
          </p>

          <button
            onClick={() => {
              if (location.state?.key === "redirected") navigate(-1);

              navigate("/dashboard");
            }}
            className="mt-6 inline-block shrink-0 rounded-md border border-indigo-400 bg-indigo-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300  disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ErrorPage;
