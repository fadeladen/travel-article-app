import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h3 className="flex md:hidden font-bold my-3 text-xl">Travel Article</h3>
      <div className="rounded-xl bg-white py-12 px-5 w-[22rem]">
        <h3 className="font-medium text-2xl mb-3">Login</h3>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
