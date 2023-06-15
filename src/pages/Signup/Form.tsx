import { FormEvent, useContext, useState } from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import AuthContext from "../../auth/AuthContext";
import OAuth from "../../auth/OAuth";
import { Link } from "react-router-dom";

const Form = () => {
  const { signup } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firstNameInputHandler = (newValue: string) => {
    setFirstName(newValue);
  };
  const lastNameInputHandler = (newValue: string) => {
    setLastName(newValue);
  };
  const emailInputHandler = (newValue: string) => {
    setEmail(newValue);
  };
  const passwordInputHandler = (newValue: string) => {
    setPassword(newValue);
  };

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: use third-party validator to validate user inputs

    if (
      firstName.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0
    ) {
      console.log(firstName, lastName, email, password);

      signup({ firstName, lastName, email, password });
    } else {
      console.log("Invalid input");
      // TODO: Invalid input animation
    }
  };

  return (
    <main
      aria-label="Main"
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
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
          onSubmit={formSubmitHandler}
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="col-span-6 sm:col-span-3">
            <Input
              label="First Name"
              id="first-name"
              autoComplete="given-name"
              onChange={firstNameInputHandler}
            ></Input>
          </div>

          <div className="z-10 col-span-6 sm:col-span-3">
            <Input
              label="Last Name"
              id="last-name"
              autoComplete="family-name"
              onChange={lastNameInputHandler}
            ></Input>
          </div>

          <div className="z-10 col-span-6">
            <Input
              label="Email"
              id="email"
              autoComplete="email"
              onChange={emailInputHandler}
              type="email"
            ></Input>
          </div>

          <div className="col-span-6">
            <Input
              label="Password"
              id="password"
              autoComplete="new-password"
              onChange={passwordInputHandler}
              type="password"
            ></Input>
          </div>

          <div className="col-span-6">
            <p className="text-sm text-slate-500">
              By creating an account, you agree to our&nbsp;
              <a href="#" className="text-slate-700 underline">
                terms and conditions
              </a>
              .
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <Button type="submit">Create an account</Button>

            <p className="mt-4 text-sm text-slate-500 sm:mt-0">
              Already have an account?&nbsp;
              <Link to="/signin" className="text-slate-700 underline">
                Log in
              </Link>
              .
            </p>
          </div>
        </form>

        <OAuth></OAuth>
      </div>
    </main>
  );
};

export default Form;
