import { render, screen } from "@testing-library/react";
import { RegisterForm } from "../RegisterForm";
import AppProvider from "src/provider/app";
import userEvent from "@testing-library/user-event";

const Register = (
  <AppProvider>
    <RegisterForm />
  </AppProvider>
);

test("user should be registered", async () => {
  render(Register);
  userEvent.type(screen.getByLabelText(/first name/i), "Akinlolu");
  userEvent.type(screen.getByLabelText(/last name/i), "Akinlolu");
  userEvent.type(screen.getByLabelText(/password/i), "akinlolu");
  userEvent.type(screen.getByLabelText(/email/i), "akinlolu@gmail.com");
  const registerButton = screen.getByRole("button", { name: /register/i });
  userEvent.click(registerButton);
  expect(window.location.pathname).toEqual("/");
});

test("login button reroutes to login page",  () => {
  render(Register);
  const loginButton = screen.getByRole("button", { name: /log in/i });
  userEvent.click(loginButton);
  expect(window.location.pathname).toEqual("/auth/login");
});
