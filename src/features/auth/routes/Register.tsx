import { AuthLayout } from "src/components/";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <AuthLayout title="Register">
      <RegisterForm />
    </AuthLayout>
  );
};
