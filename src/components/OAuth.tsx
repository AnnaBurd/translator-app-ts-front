import "../components/google-auth-btn.scss";

export default function OAuth() {
  return (
    <>
      <div className="relative mt-5 flex items-center py-4">
        <div className="flex-grow border-t border-slate-300"></div>
        <span className="mx-4 flex-shrink text-sm text-slate-500">
          Or sign in with:{" "}
        </span>
        <div className="flex-grow border-t border-slate-300"></div>
      </div>
      <div className=" flex justify-center">
        {/* Google */}
        <button
          type="button"
          className="login-with-google-btn mx-2 inline-flex items-center gap-2 rounded border border-indigo-300 hover:bg-slate-50 hover:text-[#4285F4] focus:outline-none focus:ring active:opacity-75"
        >
          Google
        </button>
        {/* Facebook */}
        <a
          className="mx-2 inline-flex items-center gap-2 rounded border border-[#3b5998] bg-[#3b5998] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-[#3b5998] focus:outline-none focus:ring active:opacity-75"
          href="/facebook"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
          </svg>
        </a>
      </div>
    </>
  );
}
