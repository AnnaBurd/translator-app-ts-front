import { useContext } from "react";
import AuthContext from "../../../auth/AuthContext";
import { motion } from "framer-motion";

type WelcomeProps = {
  stats?: {
    words?: number;
    documentsChanged?: number;
  };
};

const Welcome: React.FC<WelcomeProps> = ({ stats }) => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  const welcomeHeader = user.newUser
    ? `Welcome, ${user.firstName}!`
    : `Welcome back, ${user.firstName}!`;

  let welcomeMessage = "";
  let welcomeHint = "";

  if (user.newUser) {
    welcomeMessage =
      "Thank you for signing up for our app! To start editor, create a new document with a button below.";
    welcomeHint = "Have fun! 🎉🎈";
  } else if (stats?.words && stats?.documentsChanged) {
    welcomeMessage = `You have translated over ${stats?.words} word${
      stats.words > 1 ? "s" : ""
    } in ${stats?.documentsChanged} document${
      stats?.documentsChanged > 1 ? "s" : ""
    } this month!`;
    welcomeHint = "Keep up the great work! 🚀";
  } else {
    welcomeMessage = "You are on the right track! 🚜";
    welcomeHint =
      "To start your *free* translation session, create or open a document below.";
  }

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
        {welcomeHeader}
      </h1>

      {welcomeMessage && (
        <p className="ml-0.5 mt-1.5 text-sm text-slate-500">
          {welcomeMessage}
          <br />
          {welcomeHint}
        </p>
      )}
    </motion.div>
  );
};

export default Welcome;
