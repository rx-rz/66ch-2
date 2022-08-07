import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";
import { auth } from "src/utils/firebaseConfig";
import { signInWithGoogle } from "../api/signUpUser";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const navigate = useNavigate();
  const handleSubmit = async (data: LoginFormValues) => {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    navigate("/")
  };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <Form onSubmit={handleSubmit} options={{ mode: "onBlur" }}>
        {({ register, formState }) => (
          <>
            <InputField
              className=" border-primary border-b-2 mt-1 mb-3 w-full focus:outline-none focus:border-b-4"
              type="text"
              label="First Name"
              error={formState.errors.email}
              registration={register("email")}
            />

            <InputField
              className=" border-primary border-b-2 mt-1 mb-3 w-full focus:outline-none focus:border-b-4"
              type="text"
              label="Last Name"
              error={formState.errors.password}
              registration={register("password")}
            />
          </>
        )}
      </Form>
    </div>
  );
}
