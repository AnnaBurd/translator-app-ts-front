import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Editor from "./pages/Editor";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoutes from "./components/PrivateRoute";
import { NoMatch } from "./pages/NoMatch";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* TODO:? add landing page? */}
          <Route index element={<Navigate to="/dash" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dash" element={<UserDashboard />} />
            <Route path="/editor/:doc" element={<Editor />} />
            <Route path="/users" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
