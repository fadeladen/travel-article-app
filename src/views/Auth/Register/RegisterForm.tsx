import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../../../services/AuthService";
import toast from "react-hot-toast";

export interface RegisterFormType {
  email: string;
  password: string;
  username: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(data: RegisterFormType) {
    try {
      const resp: { user: any; jwt: string } = await apiRegister(data);
      if (resp?.user) {
        toast.success("Registration success!");
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || "Register failed");
    }
  }
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
              value={getValues("email")}
              onChange={(e) =>
                setValue("email", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.email?.message}
            />
          </div>
          <div>
            <Input
              autoComplete="off"
              label="Username"
              placeholder="Enter username"
              name="username"
              type="text"
              value={getValues("username")}
              onChange={(e) =>
                setValue("username", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.username?.message}
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
          Register
        </Button>
      </form>
      <div className="mt-3 text-sm text-center">
        <p>
          Already have an account?{" "}
          <a
            href={"/auth/login"}
            className="text-primary underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
