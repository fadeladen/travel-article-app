import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Footer } from "../ui";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      {children}
      <Toaster position="top-center" />
      <Footer />
    </div>
  );
};

export default Layout;
