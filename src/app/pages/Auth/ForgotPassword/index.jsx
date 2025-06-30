// Import Dependencies
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// Local Imports
import LoginImage from "assets/pageImages/login_image.jpg";
import CompanyLogo from "assets/pageImages/company_logo.png";
import { Button, Input, InputErrorMsg } from "components/ui";
import { schema } from "./schema";
import { useForgetPassword } from "api";

export default function ForgotPassword() {
  const {
    mutate: forgetPassword,
    error: errorMessage,
    isPending: isLoading,
  } = useForgetPassword();
  const nav = useNavigate();

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
      email: data.email,
      type: "Web",
    };

    forgetPassword(loginCredentials, {
      onSuccess: (res) => {
        console.log("Login success:", res);
        toast.success("Reset password link sent", {
          description: "Check your email!",
        });
        reset();
        setTimeout(() => {
          nav("/check-email");
        }, 3000);
      },
      onError: (err) => {
        console.error("Login failed:", err);
        toast.error("Login failed", {
          description: "Check your email and try again.",
        });
      },
    });
  };

  const goBack = () => {
    console.log("Go back");
    reset();
    nav("/login?redirect=/dashboards/home");
  };

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
                Forgot Your Password?
              </h2>
              <p className="dark:text-dark-100 mt-1 text-center text-[11px]">
                Everything’s fine! Just drop your email, and we’ll assist you
                right away.
              </p>
            </div>
          </div>

          <form
            autoComplete="off"
            className="mt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <Input
                label="Email Address"
                placeholder="Enter Email"
                prefix={
                  <EnvelopeIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                {...register("email")}
                error={errors?.email?.message}
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
              className="mt-5 w-full"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>

            <Button
              type="button"
              className="mt-5 w-full"
              variant="soft"
              color="info"
              onClick={goBack}
            >
              Back
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
