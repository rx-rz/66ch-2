import { useNavigate } from "react-router-dom";
import { Form, InputField, Button } from "src/components";
import googleLogo from "src/assets/google.svg";
import { useLogin } from "../api/useLogin";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  //This line uses the "useNavigate" hook which is used to programmatically navigate to different routes
  const navigate = useNavigate();

  //This line uses the custom hook "useLogin" and destructuring the returned object to get the following properties: handleSignIn, signInWithGoogle, and pending
  const { handleSignIn, signInWithGoogle, pending } = useLogin();

  //This line creates a function "handleNavigateToRegister" to navigate to the "/auth/register" route when called
  const handleNavigateToRegister = () => {
    navigate("/auth/register");
  };

  return (
    <div className="min-h-screen  authform">
      <div className=" w-10/12 mx-auto md:py-16 font-supreme">
        <h1 className="text-4xl text-center  font-bold">Log In </h1>
        <Button handleClick={signInWithGoogle} variant="authTertiary">
          <p className="mr-4">Sign In With Google</p>
          <img
            src={googleLogo}
            width="40px"
            height="40px"
            alt="Google Logo"
            className="dark:invert"
          />
        </Button>
        <p className="mx-auto w-fit md:text-xl mt-2">
          Or sign in with your email:
        </p>
        <div className="my-8">
          <Form
            onSubmit={(data: LoginFormValues) => handleSignIn(data)}
            options={{ mode: "onBlur" }}
          >
            {({ register, formState }) => (
              <>
                <InputField
                  variant="authField"
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
                  variant="authField"
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
                <div className="lg:flex mt-20 md:mt-12 justify-between">
                  <Button type="submit" variant="authPrimary">
                    {pending ? <>Loading....</> : <>Log In</>}
                  </Button>
                  <Button
                    type="submit"
                    handleClick={handleNavigateToRegister}
                    variant="authSecondary"
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
