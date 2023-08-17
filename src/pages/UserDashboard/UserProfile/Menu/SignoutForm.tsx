import { FormEvent } from "react";
import useSignout from "../../../../auth/useSignout";

const SignoutForm = () => {
  const signout = useSignout();

  const handleSignout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signout();
  };

  return (
    <form method="POST" onSubmit={handleSignout}>
      <button
        type="submit"
        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 dark:text-rose-500 dark:hover:bg-rose-600/10"
        role="menuitem"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        Signout
      </button>
    </form>
  );
};

export default SignoutForm;
