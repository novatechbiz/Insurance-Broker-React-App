// Import Dependencies
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Local Imports
import LoginImage from "assets/pageImages/login_image.jpg";
import CompanyLogo from "assets/pageImages/company_logo.png";
import { Button, Input, InputErrorMsg } from "components/ui";
import { Link, useNavigate, useSearchParams } from "react-router";
import Error401 from "app/pages/errors/401";
import { useAuthContext } from "app/contexts/auth/context";
import { schema } from "./schema";

export default function PasswordReset() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { resetPassword, errorMessage, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    const loginCredentials = {
      token: token,
      newPassword: data.newPassword,
    };
    resetPassword(loginCredentials, {
      onSuccess: (res) => {
        console.log("Login success:", res);
        toast.success("Password reset successful", {
          description: "You can now login with your new password",
        });
        reset();
        setTimeout(() => {
          nav("/login?redirect=/dashboards/home");
        }, 3000);
      },
      onError: (err) => {
        console.error("Login failed:", err);
        toast.error("Password reset failed", {
          description: "Reset token expired.",
        });
        reset();
        setTimeout(() => {
          nav("/forgot-password");
        }, 3000);
      },
    });
  };

  if (!token) return <Error401 />;

  return (
    <main className="min-h-100vh flex">
      <div className="relative hidden w-full lg:block">
        <img
          src={LoginImage}
          alt="Login Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="border-gray-150 dark:bg-dark-700 flex w-full flex-col items-center bg-white lg:max-w-md ltr:border-l rtl:border-r dark:border-transparent">
        <div className="flex w-full max-w-sm grow flex-col justify-center p-5">
          <div className="text-center">
            <div className="mt-4 lg:mt-0">
              <div className="mt-4">
                <img
                  src={CompanyLogo}
                  alt="Company Logo"
                  className="mx-auto size-30 object-contain"
                />
              </div>
              <p className="dark:text-dark-100 mt-3 text-center">
                INSURE PILOT
              </p>
              <h2 className="dark:text-dark-100 text-gray- mt-10 text-2xl font-semibold">
                Reset Your Password?
              </h2>
              <p className="dark:text-dark-100 mt-1 text-center text-[11px]">
                It’s time to reset! Please choose a new password.
              </p>
            </div>
          </div>

          <form
            autoComplete="off"
            className="mt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-10">
              <Input
                label="New Password"
                placeholder="Enter New Password"
                type="password"
                prefix={
                  <LockClosedIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                {...register("newPassword")}
                error={errors?.newPassword?.message}
              />
              <Input
                label="Confirm New Password"
                placeholder="Enter New Password"
                type="password"
                prefix={
                  <LockClosedIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                {...register("confirmPassword")}
                error={errors?.confirmPassword?.message}
              />
            </div>

            <div className="mt-2">
              <InputErrorMsg
                when={errorMessage && errorMessage?.message !== ""}
              >
                {errorMessage?.message}
              </InputErrorMsg>
            </div>

            <Button
              type="submit"
              className="mt-10 w-full"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Save Changes"}
            </Button>
          </form>

          <div className="text-xs-plus mt-4 text-center">
            <p className="line-clamp-1">
              <span>Already have an account?</span>{" "}
              <Link
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600 transition-colors"
                to="/login"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
