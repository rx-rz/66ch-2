import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppProvider from "src/provider/app";
import { LoginForm } from "../LoginForm";

const Login = (
  <AppProvider>
    <LoginForm />
  </AppProvider>
);

test("renders learn react link", async () => {
  render(Login);
  userEvent.type(screen.getByLabelText(/email/i), "adeleye@gmail.com");
  userEvent.type(screen.getByLabelText(/password/i), "adeleye");
  const loginButton = screen.getByRole("button", { name: /log in/i });
  userEvent.click(loginButton);
  expect(window.location.pathname).toEqual("/");
});

test("register button reroutes to register page", () => {
  render(Login);
  const registerButton = screen.getByRole("button", { name: /register/i });
  userEvent.click(registerButton);
  expect(window.location.pathname).toEqual("/auth/register");
});
