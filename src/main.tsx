import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Signup from "./pages/Signup.tsx";
import Signin from "./pages/Signin.tsx";
import Dashboard from "./pages/AdminDashboard.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="flex h-[5vh] flex-col justify-end bg-yellow-300 text-lg font-bold">
      <h1> User's dashboard preview:</h1>
    </div>
    <UserDashboard />

    <div className="flex h-[10vh] flex-col justify-end bg-yellow-300 text-lg font-bold">
      <h1> Admin's dashboard preview:</h1>
    </div>
    <Dashboard />

    <div className="flex h-[10vh] flex-col justify-end bg-yellow-300 text-lg font-bold">
      <h1> Sign up page preview:</h1>
    </div>
    <Signup />

    <div className="flex h-[10vh] flex-col justify-end bg-yellow-300 text-lg font-bold">
      <h1> Login page preview:</h1>
    </div>
    <Signin />
  </React.StrictMode>
);
