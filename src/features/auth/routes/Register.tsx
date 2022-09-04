import { useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AuthLayout } from "src/components/";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <AuthLayout title="Register">
      <Toaster />
      <RegisterForm />
    </AuthLayout>
  );
};
