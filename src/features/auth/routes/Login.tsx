import { useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AuthLayout } from "src/components";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <AuthLayout title="Login">
      <Toaster/>
      <LoginForm />
    </AuthLayout>
  );
};
