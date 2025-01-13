import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import PageNotFound from "./views/NotFound";
import useAuth from "./hooks/useAuth";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route
            path="/"
            element={<Navigate to="/home" />}
          />
          <Route
            path="/*"
            element={<PrivateRoutes />}
          />
          <Route
            index
            element={<Navigate to="/home" />}
          />
        </>
      ) : (
        <>
          <Route
            path="auth/*"
            element={<AuthRoutes />}
          />
          <Route
            path="*"
            element={<Navigate to="/auth" />}
          />
        </>
      )}
      <Route
        path="error/404"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default App;
