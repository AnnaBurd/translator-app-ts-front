import { FormEvent, useContext, useState } from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { AppAuthContext } from "../../auth/AuthProvider";

const Form = () => {
  const { signup } = useContext(AppAuthContext);

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
    <form onSubmit={formSubmitHandler} className="mt-8 grid grid-cols-6 gap-6">
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
          <a href="#" className="text-slate-700 underline">
            Log in
          </a>
          .
        </p>
      </div>
    </form>
  );
};

export default Form;
