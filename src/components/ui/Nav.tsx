import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { onSignOutSuccess } from "../../store/auth/authSlice";
import {
  AvatarIcon,
  ChevronDownIcon,
  DashboardIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

const menus = [
  { title: "Home", path: "/home", icon: <HomeIcon /> },
  { title: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { title: "Profile", path: "/profile", icon: <PersonIcon /> },
];

const Nav = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [openDropdown, setIsOpenDropDown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickLink = (path: string) => {
    navigate(path);
  };
  return (
    <div className="relative">
      <nav className="bg-white border-b px-2 md:px-0 text-sm fixed top-0 z-50 w-full">
        <div className="w-full min-h-16 container mx-auto flex justify-between items-center">
          <h3
            onClick={() => handleClickLink("/home")}
            className="font-bold cursor-pointer text-slate-800"
          >
            Travel Article
          </h3>
          <div
            onClick={() => setIsOpenDropDown((prev) => !prev)}
            className="items-center gap-4 relative cursor-pointer flex"
          >
            <div className="flex items-center gap-1">
              <AvatarIcon
                height={20}
                width={20}
              />
              <span>{user?.username}</span>
              <ChevronDownIcon />
            </div>
            {openDropdown && (
              <div className="absolute top-8 w-40 right-0 bg-white rounded-md shadow-lg border">
                <ul className="flex flex-col gap-1 text-slate-600">
                  {menus?.map((menu) => (
                    <li
                      key={menu.path}
                      className="hover:bg-slate-100 w-full p-3 flex items-center gap-2"
                      onClick={() => handleClickLink(menu.path)}
                    >
                      {menu.icon}
                      <span>{menu.title}</span>
                    </li>
                  ))}
                  <li
                    className="hover:bg-slate-100 w-full p-3 flex items-center gap-2"
                    onClick={() => dispatch(onSignOutSuccess())}
                  >
                    <ExitIcon />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
