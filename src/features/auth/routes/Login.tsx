import { Toaster } from "react-hot-toast";
import { AuthLayout } from "src/components";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  // scroll the window to the top
  window.scrollTo(0, 0);

  // Return JSX that renders an AuthLayout component with a title prop of "Login"
  // Also renders Toaster and LoginForm components within AuthLayout
  return (
    <AuthLayout title="Login">
      <Toaster />
      <LoginForm />
    </AuthLayout>
  );
};
