import { useNavigate } from "react-router-dom";
import googleLogo from "src/assets/google.svg";
import { Button, Form, InputField } from "src/components";
import { useRegister } from "../api/useRegister";

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const navigate = useNavigate();
  const { handleRegistration, signInWithGoogle, pending } = useRegister();

  const handleNavigateToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className=" min-h-screen authform">
      <div className="w-10/12 mx-auto font-pilcrow">
        <h1 className="text-4xl text-center my-4 font-bold">Register </h1>

        <Button handleClick={signInWithGoogle} variant="authTertiary">
          <img
            src={googleLogo}
            width="40px"
            alt="Google Logo"
            className=" border-primary dark:invert"
          />
        </Button>
        <p className="mx-auto w-fit md:text-xl ">
          Or use your email for registration:
        </p>
        <div className="my-8">
          <Form
            onSubmit={(data: RegisterFormValues) => handleRegistration(data)}
            options={{ mode: "onBlur" }}
          >
            {({ register, formState }) => (
              <>
                <InputField
                  variant="authField"
                  type="text"
                  label="First Name"
                  error={formState.errors.firstName}
                  registration={register("firstName", {
                    required: "Please enter your first name",
                  })}
                />

                <InputField
                  variant="authField"
                  type="text"
                  label="Last Name"
                  error={formState.errors.lastName}
                  registration={register("lastName", {
                    required: "Please enter your last name",
                  })}
                />

                <InputField
                  variant="authField"
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
                  variant="authField"
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
                  <Button type="submit" variant="authPrimary">
                    {!pending ? <>Register</> : <>Loading...</>}
                  </Button>
                  <Button
                    handleClick={handleNavigateToLogin}
                    variant="authSecondary"
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
