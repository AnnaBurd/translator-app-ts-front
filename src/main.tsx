import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Signup from "./pages/Signup.tsx";
import Signin from "./pages/Signin.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Signup />
    <Signin />
  </React.StrictMode>
);
