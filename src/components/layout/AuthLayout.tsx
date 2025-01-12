import { Outlet } from "react-router-dom";
import { AuthSvg } from "../../assets/svg";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";

const AuthLayout = () => {
  return (
    <Layout>
      <div className="bg-slate-50">
        <div className="container mx-auto w-full min-h-screen">
          <div className="flex flex-col md:flex-row gap-20 justify-center items-center">
            <div className="w-full hidden md:w-1/2 h-screen md:flex flex-col justify-center items-center">
              <h1 className="font-bold text-center mb-12 text-4xl text-slate-700">
                Travel Article
              </h1>
              <AuthSvg />
            </div>
            <div className="mt-10 md:mt-0 w-full md:w-1/2 h-full">
              <Outlet />
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </Layout>
  );
};

export default AuthLayout;
