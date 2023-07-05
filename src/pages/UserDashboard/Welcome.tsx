import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import { motion } from "framer-motion";

type WelcomeProps = {
  stats?: {
    words?: number;
    paragraphs?: number;
  };
};

const Welcome: React.FC<WelcomeProps> = ({ stats }) => {
  const { user } = useContext(AuthContext);

  // console.log("Welcome component render:", user, stats);

  return (
    <motion.div
      initial={{ opacity: 0, y: "-20vh" }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          opacity: { duration: 1.4, ease: "backInOut", delay: 0.1 },
          y: { duration: 1.4, ease: "backInOut", delay: 0.1 },
        },
      }}
      exit={{
        opacity: 0,
        y: "-20vh",
        transition: { duration: 1, ease: "backOut" },
      }}
    >
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
      {!user.newUser &&
        (stats?.words && stats?.paragraphs ? (
          <p className="mt-1.5 text-sm text-slate-500">
            You have translated over {stats?.words} words in {stats?.paragraphs}{" "}
            paragrahs this month!
            <br />
            Keep up the great work! 🚀
          </p>
        ) : (
          <p className="mt-1.5 text-sm text-slate-500">
            You are on the right track! 🚜 <br />
            To start your *free* translation session, create or open a document
            below.
          </p>
        ))}
    </motion.div>
  );
};

export default Welcome;
