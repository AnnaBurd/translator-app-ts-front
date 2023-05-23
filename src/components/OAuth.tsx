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
        {/* GitHub */}
        <a
          className="mx-2 inline-flex items-center gap-2 rounded border border-[#171515] bg-[#171515] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-[#171515] focus:outline-none focus:ring active:opacity-75"
          href="/github"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </>
  );
}
