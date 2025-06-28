// Import Dependencies
import { EnvelopeIcon, EnvelopeOpenIcon } from "@heroicons/react/24/outline";

// Local Imports
import LoginImage from "assets/pageImages/login_image.jpg";
import CompanyLogo from "assets/pageImages/company_logo.png";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function CheckEmail() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen((prev) => !prev);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const AnimatedIcon = isOpen ? EnvelopeOpenIcon : EnvelopeIcon;

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
            </div>
          </div>

          <div className="mt-15 flex justify-around space-y-4">
            <AnimatedIcon className="size-14 animate-bounce text-blue-500 transition-transform duration-500 ease-in-out" />
            <div className="flex flex-col">
              <h2 className="dark:text-dark-100 text-center text-2xl font-semibold text-gray-800">
                Check Your Email!
              </h2>
              <p className="dark:text-dark-100 mt-1 text-center text-[10px]">
                We’ve sent you a link to reset your password.
              </p>
            </div>
          </div>

          <div className="mt-25">
            <div className="rounded-[10px] border-2 border-blue-500 bg-blue-900/30 p-3">
              <p className="text-center text-white">
                We’re waiting{" "}
                <span className="animate-pulse font-semibold">.....</span>
              </p>
            </div>
          </div>

          <div className="text-xs-plus mt-8 text-center">
            <p className="line-clamp-1">
              <span>Back to forget password?</span>{" "}
              <Link
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600 transition-colors"
                to="/forgot-password"
              >
                click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
