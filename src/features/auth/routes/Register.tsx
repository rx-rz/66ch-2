import { Toaster } from "react-hot-toast";
import { AuthLayout } from "src/components/";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  // scroll to top of the page
  window.scrollTo(0, 0);

  // Return JSX that renders an AuthLayout component with a title prop of "Register"
  // Also renders Toaster and RegisterForm components within AuthLayout
  return (
    <AuthLayout title="Register">
      <Toaster />
      <RegisterForm />
    </AuthLayout>
  );
};
