import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Link } from "react-router-dom";

import useSignup from "../../auth/useSignup";
import Button from "../../components/UI/Button";

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

  const onSubmit = (data: FormData) => signup(data);

  return (
    <main
      aria-label="Main"
      className="flex items-center justify-center px-6 py-6 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 2xl:px-28"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="mt-6 text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
          Welcome to Translator App ✍🏻
        </h1>
        <p className="mt-4 leading-relaxed text-slate-500">
          We fine-tuned AI model with field-related terminology and included
          advanced editing features to ease your translation workflow.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="relative z-10 col-span-6 sm:col-span-3">
            <label
              htmlFor="firstName"
              className={`block text-sm font-medium  ${
                errors.firstName ? "text-rose-600" : "text-slate-700"
              }`}
            >
              First Name
            </label>
            <input
              {...register("firstName")}
              className={` mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm  shadow-sm focus-within:outline-1 ${
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
              className={`block text-sm font-medium  ${
                errors.lastName ? "text-rose-600" : "text-slate-700"
              }`}
            >
              Last Name
            </label>
            <input
              {...register("lastName")}
              className={` mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm  shadow-sm focus-within:outline-1 ${
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

          <div className="relative z-20 col-span-6">
            <label
              htmlFor="email"
              className={`block text-sm font-medium  ${
                errors.email ? "text-rose-600" : "text-slate-700"
              }`}
            >
              Email address
            </label>
            <input
              {...register("email")}
              className={` mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm  shadow-sm focus-within:outline-1 ${
                errors.email
                  ? "text-rose-600 focus-within:outline-rose-400"
                  : "text-slate-700 focus-within:outline-slate-400"
              }`}
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="absolute -bottom-[1.1rem] left-0 p-0 text-xs text-rose-600">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="relative col-span-6">
            <label
              htmlFor="password"
              className={`block text-sm font-medium  ${
                errors.password ? "text-rose-600" : "text-slate-700"
              }`}
            >
              New password
            </label>
            <input
              {...register("password")}
              className={` mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm  shadow-sm focus-within:outline-1 ${
                errors.password
                  ? "text-rose-600 focus-within:outline-rose-400"
                  : "text-slate-700 focus-within:outline-slate-400"
              }`}
              type="password"
              autoComplete="new-password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="absolute -bottom-[1.1rem] left-0 p-0 text-xs text-rose-600">
                {errors.password?.message}
              </p>
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

            <p className="mt-4 text-sm text-slate-500 sm:mt-0">
              Already have an account?{" "}
              <Link to="/signin" className="text-slate-700 underline">
                Sign in
              </Link>
              .
            </p>
          </div>
        </form>

        {/* <OAuth></OAuth> */}
      </div>
    </main>
  );
};

export default Form;
