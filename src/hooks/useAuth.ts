import { useSelector } from "react-redux";
import { RootState } from "../store";

const useAuth = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  return { user, token, isAuthenticated: user && token };
};

export default useAuth;
