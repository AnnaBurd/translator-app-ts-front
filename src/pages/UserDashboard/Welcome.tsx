import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";

const Welcome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {user.newUser && `Welcome, ${user.firstName}!`}
        {!user.newUser && `Welcome back, ${user.firstName}!`}
      </h1>

      {user.newUser && (
        <p className="mt-1.5 text-sm text-slate-500">
          Thank you for signing up for our app! To start editor, create a new
          document with a button below.
          <br />
          Have fun! 🎉🎈
        </p>
      )}
      {/* TODO: collect and display user statistics */}
      {!user.newUser && (
        <p className="mt-1.5 text-sm text-slate-500">
          You have translated over 1230 words in 122 paragrahs this month!
          <br />
          Keep up the great work! 🚀
        </p>
      )}
    </div>
  );
};

export default Welcome;
