import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Register from "../views/Auth/Register";
import Login from "../views/Auth/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {/* Pages */}
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="register"
          element={<Register />}
        />
        {/* Page Not Found */}
        <Route
          path="*"
          element={<Navigate to="/auth/login" />}
        />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
