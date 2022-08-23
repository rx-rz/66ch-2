import { Toaster } from "react-hot-toast";
import { AuthLayout } from "src/components";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <AuthLayout title="Login">
      <Toaster/>
      <LoginForm />
    </AuthLayout>
  );
};
