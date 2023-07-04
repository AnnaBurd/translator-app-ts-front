import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Editor from "./pages/Editor/Editor";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import { NoMatch } from "./pages/NoMatch";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";

import { AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation();
  // TODO: style scrollbar
  return (
    <AuthProvider>
      {/* <div className="fixed left-0 top-0 flex gap-10 opacity-50">
        <Link to={"/signin"}>Signin</Link>
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/dash"}>Dash</Link>
        <Link to={"/editor/123"}>Editor</Link>
        <Link to={"/users"}>Users</Link>
      </div> */}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* TODO:? add landing page? */}
          <Route index element={<Navigate to="/dash" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<RequireAuth />}>
            <Route path="/dash" element={<UserDashboard />} />
            <Route
              path="/editor/"
              element={
                <div>TODO: Open new doc form and Create New Document!</div>
              }
            />
            <Route path="/editor/:docId" element={<Editor />} />
            <Route path="/users" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}
