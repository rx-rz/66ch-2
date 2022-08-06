import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form } from "src/components/Form/Form";
import { InputField } from "src/components/Form/InputField";
import { auth } from "src/utils/firebaseConfig";
import { signInWithGoogle } from "../api/signUpUser";

export  function RegisterForm() {
  const navigate = useNavigate();
  type RegisterFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const handleSubmit = async (data: RegisterFormValues) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    navigate("/");
    console.log(data.email, data.password);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <Form onSubmit={handleSubmit}>
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="First Name"
              error={formState.errors["firstName"]}
              registration={register("firstName")}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors["lastName"]}
              registration={register("lastName")}
            />
            <InputField
              type="email"
              label="Email"
              error={formState.errors["email"]}
              registration={register("email")}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors["password"]}
              registration={register("password", {
                minLength: {
                  value: 8,
                  message: "Your password should not be less than 6 characters",
                },
              })}
            />
            <InputField
              type="password"
              label="Confirm Password"
              error={formState.errors["confirmPassword"]}
              registration={register("confirmPassword")}
            />
            <button type="submit">Submit</button>
          </>
        )}
      </Form>
    </div>
  );
}
