import { Outlet, useNavigate } from "react-router-dom";
import { Nav } from "../ui";
import Layout from "./Layout";
import classNames from "classnames";

const menus = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    title: "Category",
    path: "/admin/category",
  },
  {
    title: "Article",
    path: "/admin/article",
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const handleClickLink = (path: string) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="w-full relative pt-16">
        <Nav />
        <div className="bg-slate-50 z-10 pb-12 flex min-h-[90vh] px-2 md:px-0">
          <div className="flex flex-col sm:flex-row flex-1 container gap-4 mx-auto pt-5 relative">
            <div className="w-full flex justify-center sm:justify-start sm:w-64">
              <ul className="flex w-auto sm:w-64 py-2 sm:py-5 px-5 bg-white sm:fixed rounded-xl flex-row sm:flex-col items-center gap-2">
                {menus?.map((item, index) => (
                  <li
                    onClick={() => handleClickLink(item.path)}
                    key={`menu${index}`}
                    className={classNames(
                      "cursor-pointer w-full gap-x-2 flex items-center p-2 capitalize font-medium text-sm hover:text-primary rounded-r-lg transition ease-in-out duration-500",
                      window.location.pathname.includes(item.path) &&
                        "text-primary"
                    )}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 z-20 sm:pt-5 flex-1 bg-white rounded-xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLayout;
