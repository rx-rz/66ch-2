import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";
import { auth } from "src/utils/firebaseConfig";
import { signInWithGoogle } from "../api/signUpUser";
import googleLogo from "src/assets/google.svg";
import { RegisterFormValues } from "../types";

export function RegisterForm() {
  const navigate = useNavigate();
  const handleSubmit = async (data: RegisterFormValues) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
    navigate("/");
  };

  return (
    <div className="sm:w-8/12 w-10/12 mx-auto py-16">
      <button
        onClick={signInWithGoogle}
        className="flex text-2xl items-center  bg-primary text-white  transition-opacity duration-300  hover:opacity-90"
      >
        <img
          src={googleLogo}
          width="40px"
          alt="Google Logo"
          className="mr-2 border-r-2 border-primary invert"
        />
        <p className="mr-2">Sign up With Google</p>{" "}
      </button>
      <hr className="mt-12 " />
      <Form onSubmit={handleSubmit} options={{ mode: "onBlur" }}>
        {({ register, formState }) => (
          <>
            <InputField
              className=" border-primary border-b-2 mt-1 mb-3 w-full focus:outline-none focus:border-b-4"
              type="text"
              label="First Name"
              error={formState.errors.firstName}
              registration={register("firstName")}
            />

            <InputField
              className=" border-primary border-b-2 mt-1 mb-3 w-full focus:outline-none focus:border-b-4"
              type="text"
              label="Last Name"
              error={formState.errors.lastName}
              registration={register("lastName")}
            />

            <InputField
              className=" border-primary border-b-2 mt-1 mb-3 w-full focus:outline-none focus:border-b-4"
              type="email"
              label="Email"
              error={formState.errors.email}
              registration={register("email")}
            />

            <InputField
              className=" border-primary border-b-2 mt-1 mb-3 w-full focus:outline-none focus:border-b-4"
              type="password"
              label="Password"
              error={formState.errors.password}
              registration={register("password", {
                minLength: {
                  value: 8,
                  message: "Your password should not be less than 6 characters",
                },
              })}
            />

            <InputField
              className=" border-primary border-b-2 mt-1 mb-3 w-full focus:outline-none focus:border-b-4"
              type="password"
              label="Confirm Password"
              error={formState.errors.confirmPassword}
              registration={register("confirmPassword")}
            />

            <button
              type="submit"
              className="flex text-2xl items-center border-2 px-2 border-primary mt-8 transition-colors duration-300  hover:bg-primary hover:text-white"
            >
              Register
            </button>
          </>
        )}
      </Form>
    </div>
  );
}
