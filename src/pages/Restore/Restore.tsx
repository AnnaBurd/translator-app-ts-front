import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import OAuth from "../../auth/OAuth";
import AnimatedPage from "../../components/animations/AnimatedPage";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Config from "../../../config.json";
import AuthContext from "../../auth/AuthContext";

type FormDataType = {
  email: string | undefined;
  resetToken: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
};

const inputValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address (e.g. email@example.com)"),
    resetToken: yup.string().max(64),
    newPassword: yup.string().max(40),
    confirmPassword: yup
      .string()
      .max(40)
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.newPassword === value;
      }),
  })
  .required();

export default function Restore() {
  // User email and password reset token
  const [emailReset, setEmailReset] = useState("");
  const [tokenReset, setTokenReset] = useState("");

  // In case if user clicks activation link in the email, token and email are automatically passed as query parameters
  const [searchParams] = useSearchParams();

  // const signin = useSignin();

  // const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(inputValidationSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorSubmitting, setErrorSubmitting] = useState("");

  type submitPhaseType =
    | "enter-email"
    | "enter-token"
    | "confirm-reset"
    | "enter-new-password"
    | "reset-successful";

  const [submittionPhase, setSubmittionPhase] =
    useState<submitPhaseType>("enter-email");

  const { updateUserDetails, updateAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // On loading page, check if there are query parameters in the URL
  useEffect(() => {
    if (emailReset || tokenReset) return;

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      setTokenReset(token);
      setEmailReset(email);
      setSubmittionPhase("confirm-reset");
    }
  }, [emailReset, searchParams, tokenReset]);

  // When both email and token reset are entered, send them to the server to verification
  useEffect(() => {
    if (submittionPhase !== "confirm-reset" || isSubmitting || errorSubmitting)
      return;

    const confirmReset = async () => {
      try {
        setIsSubmitting(true);

        const response = await fetch(
          `${Config.API_BASE_URL}/users/confirmReset`,
          {
            method: "POST",
            body: JSON.stringify({ email: emailReset, token: tokenReset }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok)
          throw new Error("Could not reset password. Please try again later.");

        setIsSubmitting(false);
        setSubmittionPhase("enter-new-password");
      } catch (error) {
        setIsSubmitting(false);
        setErrorSubmitting("Could not reset password. Please try again later.");
      }
    };

    confirmReset();
  }, [emailReset, errorSubmitting, isSubmitting, submittionPhase, tokenReset]);

  const handleEmailSubmit = async (data: FormDataType) => {
    try {
      if (!data.email) return;

      setIsSubmitting(true);

      const response = await fetch(`${Config.API_BASE_URL}/users/reset`, {
        method: "POST",
        // credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok)
        throw new Error("Could not reset password. Please try again later.");

      setIsSubmitting(false);
      setSubmittionPhase("enter-token");
      setEmailReset(data.email);
    } catch (error) {
      setIsSubmitting(false);
      setErrorSubmitting((error as Error).message);
    }
  };

  const handleTokenSubmit = async (data: FormDataType) => {
    try {
      if (!data.resetToken) return;

      setTokenReset(data.resetToken);
      setSubmittionPhase("confirm-reset");
      setErrorSubmitting("");
    } catch (error) {
      setErrorSubmitting((error as Error).message);
    }
  };

  const handleNewPasswordSubmit = async (data: FormDataType) => {
    console.log("handleNewPasswordSubmit: ", data);

    try {
      if (!data.newPassword || !data.confirmPassword) return;

      setIsSubmitting(true);

      const response = await fetch(
        `${Config.API_BASE_URL}/users/confirmReset`,
        {
          method: "POST",
          body: JSON.stringify({
            email: emailReset,
            token: tokenReset,
            newPassword: data.newPassword,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error("Could not reset password. Please try again later.");

      const json = await response.json();

      // Recieve user details and access token from the server
      updateAccessToken(json.accessToken);
      updateUserDetails(json.data);

      // Go to user dash by default
      navigate("/dashboard");
    } catch (error) {
      setIsSubmitting(false);
      setErrorSubmitting(
        (error as Error).message ||
          "Could not reset password. Please try again later."
      );
    }
  };

  const onSubmit = async (data: FormDataType) => {
    if (isSubmitting) return;

    switch (submittionPhase) {
      // Send email to the server to request password reset
      case "enter-email":
        handleEmailSubmit(data);
        break;

      // Update entered token in the application state
      case "enter-token":
        handleTokenSubmit(data);
        break;

      case "confirm-reset":
        handleTokenSubmit(data);
        break;

      case "enter-new-password":
        console.log("enter-new-password");
        handleNewPasswordSubmit(data);
        break;

      case "reset-successful":
        console.log("reset-successful");
        break;
    }
  };

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  return (
    <AnimatedPage fadeOnExit={false}>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <motion.h1
            className="text-center text-2xl font-bold text-[var(--color-primary)] sm:text-3xl"
            exit={
              isSubmitting
                ? {
                    opacity: 0,
                    transition: {
                      duration: 0.1,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
          >
            Reset Password
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-md text-center text-slate-500"
            exit={
              isSubmitting
                ? {
                    opacity: 0,
                    transition: {
                      duration: 0.1,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
          >
            {submittionPhase === "enter-email" &&
              !errorSubmitting &&
              "Enter your email address and we will send you a link to reset password."}
            {submittionPhase === "enter-token" &&
              !errorSubmitting &&
              "Enter the access code we sent to your email address, or click the link in your email."}
            {submittionPhase === "confirm-reset" &&
              !errorSubmitting &&
              "We are confirming your request."}
            {submittionPhase === "enter-new-password" &&
              !errorSubmitting &&
              "Enter new password for your account."}
            {submittionPhase === "reset-successful" &&
              !errorSubmitting &&
              "Your password has been reset successfully."}
            {errorSubmitting &&
              "Ups! We could not reset your password, please verify your credentials and activation code and try again later."}
          </motion.p>

          <motion.form
            layout="size"
            transition={{
              layout: { duration: 0.3 },
            }}
            exit={
              isSubmitting
                ? {
                    y: "-100vh",
                    scale: 0.7,
                    opacity: 0,
                    transition: {
                      duration: 0.6,
                      ease: "backInOut",
                      opacity: { duration: 0.3 },
                    },
                  }
                : {}
            }
            className={`relative mb-0 mt-4  overflow-hidden rounded-lg border border-slate-200 p-4 shadow-lg sm:p-6 lg:p-8`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {isSubmitting && (
              <motion.div
                className="absolute left-0 top-0 z-30 h-[20rem] w-[40rem] bg-[--color-secondary]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5, transition: { duration: 1 } }}
              ></motion.div>
            )}
            {isSubmitting && (
              <motion.span
                className="absolute left-1/2 top-1/3 z-50 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.5 },
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

            {submittionPhase === "enter-email" && (
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
            )}

            {(submittionPhase === "enter-token" ||
              submittionPhase === "confirm-reset") && (
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Activation Code
                </label>

                <div className="relative">
                  <input
                    {...register("resetToken")}
                    // type={passwordVisible ? "text" : "password"}
                    className={`w-full rounded-lg border-slate-200 p-4 pe-12 text-sm shadow-sm transition-colors duration-300 focus-within:outline-1 ${
                      errors.email
                        ? "text-rose-600 focus-within:outline-rose-400"
                        : "text-slate-700 focus-within:outline-slate-400"
                    }`}
                    placeholder="Enter activation code"
                    autoComplete="one-time-code"
                    aria-invalid={errors.email ? "true" : "false"}
                  />

                  <span
                    className="absolute inset-y-0 end-0 grid cursor-pointer place-content-center px-4"
                    // onClick={togglePasswordVisibility}
                  >
                    {!true && (
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
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}

                    {true && (
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
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
            )}

            {submittionPhase === "enter-new-password" && (
              <>
                <div className="mb-4">
                  <label htmlFor="password" className="sr-only">
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      {...register("newPassword")}
                      // type={passwordVisible ? "text" : "password"}
                      className={`w-full rounded-lg border-slate-200 p-4 pe-12 text-sm shadow-sm transition-colors duration-300 focus-within:outline-1 ${
                        errors.email
                          ? "text-rose-600 focus-within:outline-rose-400"
                          : "text-slate-700 focus-within:outline-slate-400"
                      }`}
                      placeholder="New password"
                      autoComplete="new-password"
                      aria-invalid={errors.email ? "true" : "false"}
                    />

                    <span
                      className="absolute inset-y-0 end-0 grid cursor-pointer place-content-center px-4"
                      // onClick={togglePasswordVisibility}
                    >
                      {!true && (
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
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}

                      {true && (
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
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
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
                      // type={passwordVisible ? "text" : "password"}
                      className={`w-full rounded-lg border-slate-200 p-4 pe-12 text-sm shadow-sm transition-colors duration-300 focus-within:outline-1 ${
                        errors.confirmPassword
                          ? "text-rose-600 focus-within:outline-rose-400"
                          : "text-slate-700 focus-within:outline-slate-400"
                      }`}
                      placeholder="Confirm password"
                      autoComplete="confirm-password"
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                    />

                    <span
                      className="absolute inset-y-0 end-0 grid cursor-pointer place-content-center px-4"
                      // onClick={togglePasswordVisibility}
                    >
                      {!true && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${
                            errors.confirmPassword
                              ? "text-rose-400"
                              : "text-slate-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}

                      {true && (
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
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
              </>
            )}

            <button
              type="submit"
              disabled={
                errors.email ||
                errors.confirmPassword ||
                errors.newPassword ||
                errors.resetToken
                  ? true
                  : false
              }
              className="mb-4 block w-full rounded-md border border-indigo-400 bg-indigo-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300 disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
            >
              Submit
            </button>

            <p className="text-center text-sm text-slate-500">
              No account yet?{" "}
              <Link className="underline" to="/signup">
                Sign up
              </Link>
            </p>
            {/* <OAuth></OAuth> */}
          </motion.form>
        </div>
      </div>

      {/* <div className="fixed left-0 top-0">
        ERROR: {errorSubmitting}
        <br></br>
        IsSubmitting: {isSubmitting}
        <br></br>
        Submission phase: {submittionPhase}
        <br></br>
        <br></br>
        <br></br>
        Email: {emailReset}
        <br></br>
        Token: {tokenReset}
      </div> */}
    </AnimatedPage>
  );
}
