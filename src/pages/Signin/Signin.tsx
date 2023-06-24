import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../../auth/OAuth";
import useSignin from "../../auth/useSignin";
import AnimatedPage from "../../components/animations/AnimatedPage";
import { useState } from "react";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// TODO: add localization for form labels/error messages
type FormData = {
  email: string;
  password: string;
};

const inputValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address (e.g. email@example.com)")
      .required("Please enter a valid email address (e.g. email@example.com)"),
    password: yup.string().required("Please enter a password"),
  })
  .required();

export default function Signin() {
  const signin = useSignin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(inputValidationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorSigningIn, setErrorSigningIn] = useState("");

  const onSubmit = async (data: FormData) => {
    // e.preventDefault();

    console.log("data", data);

    try {
      setIsLoading(true);
      await signin(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error signing in", error);
      setErrorSigningIn("Could not signin with these credentials.");
      // navigate("/error");
    }
  };

  return (
    <AnimatedPage fadeOnExit={false}>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <motion.h1
            className="text-center text-2xl font-bold text-[var(--color-primary)] sm:text-3xl"
            exit={{
              // y: "-100vh",
              // scale: 0.1,
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeOut",
                // opacity: { duration: 0.3 },

                // bounce: 0.25,
                // damping: 5,
                // mass: 10,
                // stiffness: 10,
              },
            }}
          >
            Start Free
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-md text-center text-slate-500"
            exit={{
              // y: "-100vh",
              // scale: 0.1,
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeOut",
                // opacity: { duration: 0.3 },

                // bounce: 0.25,
                // damping: 5,
                // mass: 10,
                // stiffness: 10,
              },
            }}
          >
            Sign in to start new translation, download or edit your documents,
            or view usage statistics.
          </motion.p>

          <motion.form
            layout="size"
            transition={{
              layout: { duration: 0.3 },
            }}
            exit={{
              y: "-100vh",
              // scale: 0.1,
              opacity: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                opacity: { duration: 0.3 },

                // bounce: 0.25,
                // damping: 5,
                // mass: 10,
                // stiffness: 10,
              },
            }}
            className={`relative mb-0 mt-4  overflow-hidden rounded-lg border border-slate-200 p-4 shadow-lg sm:p-6 lg:p-8`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {isLoading && (
              <motion.div
                className="absolute left-0 top-0 z-30 h-[20rem] w-[40rem] bg-[--color-secondary]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5, transition: { duration: 1 } }}
              ></motion.div>
            )}
            {isLoading && (
              <motion.span
                className="absolute left-1/2 top-1/3 z-50 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{
                  // rotate: 360,
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.5 },
                  // transition: { rotate: { duration: 2, yoyo: Infinity } },
                }}
              >
                <div aria-label="Loading..." role="status">
                  <svg className="h-7 w-7 animate-spin" viewBox="3 3 18 18">
                    <path
                      className="fill-[--color-secondary]"
                      d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    ></path>
                    <path
                      className="fill-[--color-primary]"
                      d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                    ></path>
                  </svg>
                </div>
              </motion.span>
            )}
            <div className="mb-4 mt-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  {...register("email")}
                  className={`w-full rounded-lg border-slate-200 p-4 pe-12 text-sm shadow-sm transition-colors duration-300 focus-within:outline-1 ${
                    errors.email
                      ? "text-rose-600 focus-within:outline-rose-400"
                      : "text-slate-700 focus-within:outline-slate-400"
                  }`}
                  placeholder="Enter email"
                  // id="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? "true" : "false"}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${
                      errors.email ? "text-rose-400" : "text-slate-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
              {errors.email && (
                <motion.p
                  className="px-4 py-1 text-xs text-rose-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.email?.message}
                </motion.p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  {...register("password")}
                  type="password"
                  className={`w-full rounded-lg border-slate-200 p-4 pe-12 text-sm shadow-sm transition-colors duration-300 focus-within:outline-1 ${
                    errors.password
                      ? "text-rose-600 focus-within:outline-rose-400"
                      : "text-slate-700 focus-within:outline-slate-400"
                  }`}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  aria-invalid={errors.password ? "true" : "false"}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${
                      errors.password ? "text-rose-400" : "text-slate-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
              {errors.password && (
                <motion.p
                  className="px-4 py-1 text-xs text-rose-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.password?.message}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={errors.email || errors.password ? true : false}
              className="mb-4 block w-full rounded-md border border-indigo-400 bg-indigo-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300 disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
            >
              Sign in
            </button>

            {errorSigningIn && (
              <p className="mb-1 text-center text-sm text-slate-500">
                {errorSigningIn}{" "}
                <Link className="underline" to="#TODO">
                  Restore password
                </Link>
                ?
              </p>
            )}
            <p className="text-center text-sm text-slate-500">
              No account?{" "}
              <Link className="underline" to="/signup">
                Sign up
              </Link>
            </p>
            {/* <OAuth></OAuth> */}
          </motion.form>
        </div>
      </div>
    </AnimatedPage>
  );
}
