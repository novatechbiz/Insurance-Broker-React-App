// Import Dependencies
import { Link } from "react-router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
//import DashboardCheck from "assets/illustrations/dashboard-check.svg?react";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import LoginImage from "assets/pageImages/login_image.jpg";
import CompanyLogo from "assets/pageImages/company_logo.png";
import { Button, Checkbox, Input, InputErrorMsg } from "components/ui";
import { useAuthContext } from "app/contexts/auth/context";
import { schema } from "./schema";
//import { useThemeContext } from "app/contexts/theme/context";

// ----------------------------------------------------------------------

export default function SignIn() {
  const { login, errorMessage, isLoading } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const {
  //   primaryColorScheme: primary,
  //   lightColorScheme: light,
  //   darkColorScheme: dark,
  //   isDark,
  // } = useThemeContext();

  const onSubmit = (data) => {
    console.log("Form data:", data);

    const loginCredentials = {
      username: data.username,
      password: data.password,
    };

    login(loginCredentials, {
      onSuccess: (res) => {
        console.log("Login success:", res);
        toast.success("Login successful", {
          description: "Welcome back!",
          duration: 4000,
        });
      },
      onError: (err) => {
        console.error("Login failed:", err);
        toast.error("Login failed", {
          description: "Check your credentials and try again.",
        });
      },
    });
  };

  return (
    <main className="min-h-100vh flex">
      {/* <div className="fixed top-0 hidden p-6 lg:block lg:px-12">
        <div className="flex items-center gap-2">
          <Logo className="size-12" />
          <p className="dark:text-dark-100 text-xl font-semibold text-gray-800 uppercase">
            IBS
          </p>
        </div>
      </div> */}
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
            <Logo className="mx-auto size-16 md:hidden" />
            <div className="mt-4 lg:mt-0">
              <h2 className="dark:text-dark-100 text-2xl font-semibold text-gray-600">
                Welcome To
              </h2>
              <p className="dark:text-dark-100 text-3xl font-bold text-gray-400">
                INSURE PILOT
              </p>
              <div className="mt-4">
                <img
                  src={CompanyLogo}
                  alt="Company Logo"
                  className="mx-auto size-30 object-contain"
                />
              </div>
              <p className="dark:text-dark-100 mt-4 text-center">
                Please Sign in to continue
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="mt-10"
          >
            <div className="space-y-4">
              <Input
                label="Username"
                placeholder="Enter Username"
                prefix={
                  <EnvelopeIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                {...register("username")}
                error={errors?.username?.message}
              />
              <Input
                label="Password"
                placeholder="Enter Password"
                type="password"
                prefix={
                  <LockClosedIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                {...register("password")}
                error={errors?.password?.message}
              />
              <div className="flex items-center justify-between space-x-2">
                <Checkbox label="Remember me" />
                <a
                  href="##"
                  className="dark:text-dark-300 dark:hover:text-dark-100 dark:focus:text-dark-100 text-xs text-gray-400 transition-colors hover:text-gray-800 focus:text-gray-800"
                >
                  Forgot Password?
                </a>
              </div>
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
              {isLoading ? "Sign In..." : "Sign In"}
            </Button>
          </form>
          <div className="text-xs-plus mt-4 text-center">
            <p className="line-clamp-1">
              <span>Dont have Account?</span>{" "}
              <Link
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600 transition-colors"
                to="/pages/sign-up-v2"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* <div className="text-tiny-plus my-7 flex items-center">
            <div className="dark:bg-dark-500 h-px flex-1 bg-gray-200"></div>
            <p className="mx-3">OR</p>
            <div className="dark:bg-dark-500 h-px flex-1 bg-gray-200"></div>
          </div> */}

          {/* <div className="flex gap-4">
            <Button className="h-10 flex-1 gap-3" variant="outlined">
              <img
                className="size-5.5"
                src="/images/logos/google.svg"
                alt="logo"
              />
              <span>Google</span>
            </Button>
            <Button className="h-10 flex-1 gap-3" variant="outlined">
              <img
                className="size-5.5"
                src="/images/logos/github.svg"
                alt="logo"
              />
              <span>Github</span>
            </Button>
          </div> */}
        </div>

        {/* <div className="dark:text-dark-300 mt-5 mb-3 flex justify-center text-xs text-gray-400">
          <a href="##">Privacy Notice</a>
          <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
          <a href="##">Term of service</a>
        </div> */}
      </div>
    </main>
  );
}
