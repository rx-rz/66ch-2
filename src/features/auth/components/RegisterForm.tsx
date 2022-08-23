import { useNavigate } from "react-router-dom";
import googleLogo from "src/assets/google.svg";
import { Button, Form, InputField } from "src/components";
import { useRegister } from "../api/useRegister";

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  sike?: string;
  password: string;
};

export function RegisterForm() {
  const navigate = useNavigate();
  const { handleRegistration, signInWithGoogle, pending } = useRegister();

  const handleNavigateToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className=" min-h-screen">
      <div className="sm:w-8/12 w-10/12 mx-auto font-pilcrow">
      <h1 className="text-4xl text-center my-4 font-bold">Register </h1>

        <Button
          handleClick={signInWithGoogle}
          className="flex text-2xl items-center  border-tertiary border-2 rounded-full text-white  transition-opacity duration-300  hover:opacity-80 mx-auto my-12"
        >
          <img
            src={googleLogo}
            width="40px"
            alt="Google Logo"
            className=" border-primary"
          />
        </Button>
        <p className="mx-auto w-fit md:text-xl">
          Or use your email for registration:
        </p>
        <div className="my-16">
          <Form
            onSubmit={(data: RegisterFormValues) => handleRegistration(data)}
            options={{ mode: "onBlur" }}
          >
            {({ register, formState }) => (
              <>
                <InputField
                  className=" border-tertiary w-full border p-2  bg-primary focus:bg-white mt-2 font-hind"
                  type="text"
                  label="First Name"
                  error={formState.errors.firstName}
                  registration={register("firstName", {
                    required: "Please enter your first name",
                  })}
                />

                <InputField
                  className=" border-tertiary w-full border p-2  bg-primary focus:bg-white mt-2 font-hind"
                  type="text"
                  label="Last Name"
                  error={formState.errors.lastName}
                  registration={register("lastName", {
                    required: "Please enter your last name",
                  })}
                />

                <InputField
                  className=" border-tertiary w-full border p-2  bg-primary focus:bg-white mt-2 font-hind"
                  type="email"
                  label="Email"
                  error={formState.errors.email}
                  registration={register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />

                <InputField
                  className=" border-tertiary w-full border p-2  bg-primary focus:bg-white mt-2 font-hind"
                  type="password"
                  label="Password"
                  error={formState.errors.password}
                  registration={register("password", {
                    minLength: {
                      value: 8,
                      message:
                        "Your password should not be less than 6 characters",
                    },
                  })}
                />

                <div className="lg:flex mt-12 justify-between">
                  <Button
                    type="submit"
                    className="text-xl font-Synonym lg:w-5/12 w-full bg-yellow-300 text-black p-3  transition-shadow duration-300 border-tertiary border hover:shadow-2xl shadow-black mb-8 md:mb-0"
                  >
                    {!pending ? <>Register</> : <>Loading...</>}
                  </Button>
                  <Button
                    handleClick={handleNavigateToLogin}
                    className="text-xl font-Synonym lg:w-5/12 w-full bg-primary text-tertiary p-3  transition-shadow duration-300 border-tertiary border hover:shadow-2xl shadow-black mb-12 md:mb-0"
                  >
                    Log In
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
