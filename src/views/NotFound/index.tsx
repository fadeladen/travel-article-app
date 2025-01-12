import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center flex-col gap-3 items-center h-screen text-center text-4xl">
      <p>404</p>
      <p>Page Not Found</p>
      <Button
        onClick={() => {
          navigate("/home");
        }}
      >
        Back to home
      </Button>
    </div>
  );
};

export default PageNotFound;
