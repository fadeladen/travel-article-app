import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "../../../components/ui";
import { apiSignIn } from "../../../services/AuthService";
import { useDispatch } from "react-redux";
import { onSignInSuccess } from "../../../store/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface LoginFormType {
  identifier: string;
  password: string;
}

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  async function onSubmit(data: LoginFormType) {
    try {
      const resp: { user: any; jwt: string } = await apiSignIn(data);
      if (resp?.user && resp?.jwt) {
        dispatch(onSignInSuccess(resp));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || "Login failed");
    }
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-5">
          <div>
            <Input
              autoComplete="off"
              label="Email"
              placeholder="Enter email"
              name="email"
              type="text"
              value={getValues("identifier")}
              onChange={(e) =>
                setValue("identifier", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.identifier?.message}
            />
          </div>
          <div>
            <Input
              autoComplete="off"
              label="Password"
              name="password"
              type="password"
              value={getValues("password")}
              placeholder="Enter Password"
              onChange={(e) =>
                setValue("password", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.password?.message}
            />
          </div>
        </div>
        <Button
          type="submit"
          classname="w-full"
          disabled={!isValid || isSubmitting}
        >
          Login
        </Button>
      </form>
      <div className="mt-3 text-sm text-center">
        <p>
          No account?{" "}
          <span
            onClick={() => navigate("/auth/register")}
            className="text-primary underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
