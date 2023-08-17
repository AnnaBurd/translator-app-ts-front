import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Link } from "react-router-dom";

import useSignup from "../../auth/useSignup";
import Button from "../../components/UI/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FormData = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string;
  password: string;
};

// TODO: add localization for form labels/error messages
const inputValidationSchema = yup
  .object({
    firstName: yup.string().trim(),
    lastName: yup.string().trim(),
    email: yup
      .string()
      .email("Please enter a valid email address (e.g. email@example.com)")
      .required("Please enter a valid email address (e.g. email@example.com)"),
    password: yup
      .string()
      .required("Please enter a new password for your account"),
  })
  .required();

const Form = () => {
  const signup = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(inputValidationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await signup(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error)?.message || "Something went wrong");
    }
  };

  return (
    <main
      aria-label="Main"
      className="flex items-center justify-center px-6 py-6 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 2xl:px-28"
    >
      <div className="relative max-w-xl lg:max-w-3xl">
        <h1 className="mt-6 text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
          Welcome to Translator App ✍🏻
        </h1>
        <p className="mt-4 leading-relaxed text-slate-500">
          We fine-tuned AI model with field-related terminology and included
          advanced editing features to ease your translation workflow.
        </p>

        {isLoading && (
          <motion.div
            className="absolute z-30 h-[100%] w-[100%] bg-gradient-to-r from-[--color-secondary] "
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, transition: { duration: 0.5 } }}
          ></motion.div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative mt-8 grid grid-cols-6 gap-6"
        >
          {isLoading && (
            <motion.span
              className="absolute left-1/2 top-1/3 z-50"
              initial={{ opacity: 0 }}
              animate={{
                // rotate: 360,
                opacity: 1,
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
          <div className="relative z-10 col-span-6 sm:col-span-3">
            <label
              htmlFor="firstName"
              className={`block text-sm font-medium transition-colors duration-300 ${
                errors.firstName ? "text-rose-600" : "text-slate-700"
              }`}
            >
              First Name
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              className={` mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm  shadow-sm transition-colors duration-300 focus-within:outline-1 ${
                errors.firstName
                  ? "text-rose-600 focus-within:outline-rose-400"
                  : "text-slate-700 focus-within:outline-slate-400"
              }`}
              autoComplete="given-name"
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            <p className="absolute -bottom-[1.1rem] left-0 p-0 text-xs text-rose-600">
              {errors.firstName?.message}
            </p>
          </div>

          <div className="relative col-span-6 sm:col-span-3">
            <label
              htmlFor="lastName"
              className={`block text-sm font-medium transition-colors duration-300  ${
                errors.lastName ? "text-rose-600" : "text-slate-700"
              }`}
            >
              Last Name
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              className={` mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm  shadow-sm transition-colors duration-300 focus-within:outline-1 ${
                errors.lastName
                  ? "text-rose-600 focus-within:outline-rose-400"
                  : "text-slate-700 focus-within:outline-slate-400"
              }`}
              autoComplete="family-name"
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            <p className="absolute -bottom-[1.1rem] left-0 p-0 text-xs text-rose-600">
              {errors.lastName?.message}
            </p>
          </div>

          <motion.div className="relative z-20 col-span-6 opacity-[99]">
            <label
              htmlFor="email"
              className={`block text-sm font-medium  transition-colors duration-300 ${
                errors.email ? "text-rose-600" : "text-slate-700"
              }`}
            >
              Email address
            </label>
            <input
              {...register("email")}
              id="email"
              className={` mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm  shadow-sm transition-colors duration-300 focus-within:outline-1  ${
                errors.email
                  ? "text-rose-600 focus-within:outline-rose-400"
                  : "text-slate-700 focus-within:outline-slate-400"
              }`}
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <motion.p
                className="absolute -bottom-[1.1rem] left-0 p-0 text-xs text-rose-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {errors.email?.message}
              </motion.p>
            )}
          </motion.div>
          <div className="relative col-span-6">
            <label
              htmlFor="password"
              className={`block text-sm font-medium  transition-colors duration-300 ${
                errors.password ? "text-rose-600" : "text-slate-700"
              }`}
            >
              New password
            </label>
            <input
              {...register("password")}
              id="password"
              className={` mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm  shadow-sm transition-colors duration-300 focus-within:outline-1 ${
                errors.password
                  ? "text-rose-600 focus-within:outline-rose-400"
                  : "text-slate-700 focus-within:outline-slate-400"
              }`}
              type="password"
              autoComplete="new-password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <motion.p
                className="absolute -bottom-[1.1rem] left-0 p-0 text-xs text-rose-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {errors.password?.message}
              </motion.p>
            )}
          </div>

          <div className="col-span-6">
            <p className="text-sm text-slate-500">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-slate-700 underline">
                terms and conditions
              </Link>
              .
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <Button
              type="submit"
              disabled={errors.email || errors.password ? true : false}
            >
              Create an account
            </Button>

            <AnimatePresence mode="wait">
              {!error && (
                <motion.p
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                  key="signin-link"
                  className="mt-4 text-sm text-slate-500 sm:mt-0"
                >
                  Already have an account?{" "}
                  <Link to="/signin" className="text-slate-700 underline">
                    Sign in
                  </Link>
                  .
                </motion.p>
              )}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                  key="signin-link-onerror"
                  className="mt-4 text-sm leading-4 text-slate-500 sm:mt-0"
                >
                  <span className="text-rose-400 opacity-80">
                    Ups! Could not signup with these credentials.
                  </span>{" "}
                  <br></br>Do you want to{" "}
                  <Link to="/signin" className="text-slate-700 underline">
                    sign in
                  </Link>
                  ?
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>

        {/* <OAuth></OAuth> */}
      </div>
    </main>
  );
};

export default Form;
