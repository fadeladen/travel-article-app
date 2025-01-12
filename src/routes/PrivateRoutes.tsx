import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayout from "../components/layout/BaseLayout";
import AdminLayout from "../components/layout/AdminLayout";
import DashboardPage from "../views/Admin/DashboardPage";
import CategoryPage from "../views/Admin/CategoryPage";
import ArticlePage from "../views/Admin/ArticlePage";
import HomePage from "../views/Home";
import ArticleDetailPage from "../views/Article/Detail";
import ProfilePage from "../views/Profile";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route
          path="auth/*"
          element={<Navigate to="/home" />}
        />
        <Route
          path="home"
          element={<HomePage />}
        />
        <Route
          path="profile"
          element={<ProfilePage />}
        />
        <Route
          path="article/:id"
          element={<ArticleDetailPage />}
        />
      </Route>
      <Route element={<AdminLayout />}>
        <Route
          path="admin/dashboard"
          element={<DashboardPage />}
        />
        <Route
          path="admin/category"
          element={<CategoryPage />}
        />
        <Route
          path="admin/article"
          element={<ArticlePage />}
        />
      </Route>
      {/* Page Not Found */}
      <Route
        path="*"
        element={<Navigate to="/error/404" />}
      />
    </Routes>
  );
};

export default PrivateRoutes;
