import { Toaster } from "react-hot-toast";
import { AuthLayout } from "src/components/";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <AuthLayout title="Register">
      <Toaster/>
      <RegisterForm />
    </AuthLayout>
  );
};
