import { useContext } from "react";
import { AppAuthContext } from "../../auth/AuthProvider";

const Welcome = () => {
  const { user } = useContext(AppAuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Welcome Back, {user.firstName}!
        {/* TODO: show "Back" only for old users */}
      </h1>

      <p className="mt-1.5 text-sm text-slate-500">
        You have translated over 1230 words in 122 paragrahs this month!
        <br />
        Keep up the great work! 🚀
      </p>
    </div>
  );
};

export default Welcome;
