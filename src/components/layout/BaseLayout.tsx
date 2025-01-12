import { Outlet } from "react-router-dom";
import { Nav } from "../ui";
import Layout from "./Layout";

const BaseLayout = () => {
  return (
    <Layout>
      <div className="w-full relative pt-16">
        <Nav />
        <div className="bg-slate-50 min-h-[90vh] px-5 md:px-0">
          <div className="py-5 container mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BaseLayout;
