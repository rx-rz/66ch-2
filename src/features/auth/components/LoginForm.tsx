import { useNavigate } from "react-router-dom";
import { Form, InputField, Button } from "src/components";
import googleLogo from "src/assets/google.svg";
import { useLogin } from "../api/useLogin";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const navigate = useNavigate();

  const { handleSignIn, signInWithGoogle, pending } = useLogin();
  const handleNavigateToRegister = () => {
    navigate("/auth/register");
  };

  return (
    <div className="min-h-screen">
      <div className="sm:w-8/12 w-10/12 mx-auto py-16">
        <h1 className="text-4xl text-center my-4 font-bold">Log In </h1>

        <Button
          handleClick={signInWithGoogle}
          className="flex text-2xl items-center  border-tertiary border-2 rounded-full text-white  transition-opacity duration-300  hover:opacity-80 mx-auto my-12"
        >
          <img src={googleLogo} width="40px" height="40px" alt="Google Logo" />
        </Button>
        <p className="mx-auto w-fit md:text-xl">
          Or use your email for authentication:
        </p>
        <div className="my-16">
          <Form
            onSubmit={(data: LoginFormValues) => handleSignIn(data)}
            options={{ mode: "onBlur" }}
          >
            {({ register, formState }) => (
              <>
                <InputField
                  className=" border-tertiary w-full border p-2 rounded-md bg-primary focus:bg-white mt-2"
                  type="text"
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
                  className=" border-tertiary w-full border p-2 rounded-md bg-primary focus:bg-white mt-2"
                  type="password"
                  label="Password"
                  error={formState.errors.password}
                  registration={register("password", {
                    minLength: {
                      value: 6,
                      message:
                        "Your password should not be less than 6 characters long",
                    },
                  })}
                />
                <div className="lg:flex mt-12 justify-between">
                  <Button
                    type="submit"
                    className="text-xl font-Synonym lg:w-5/12 w-full bg-tertiary text-white p-3 rounded-md transition-shadow duration-300 border-tertiary border hover:shadow-2xl shadow-black mb-8 md:mb-0"
                  >
                    {pending ? <>Loading....</> : <>Log In</>}
                  </Button>
                  <Button
                    type="submit"
                    handleClick={handleNavigateToRegister}
                    className="text-xl font-Synonym lg:w-5/12 w-full bg-primary text-tertiary p-3 rounded-md transition-shadow duration-300 border-tertiary border hover:shadow-2xl shadow-black"
                  >
                    Register
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
