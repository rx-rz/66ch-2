import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppProvider from "src/provider/app";
import PostContent from "../../routes/PostContent";
import PostSettings from "../CreatePost/PostSettings";

const editPostSettings = jest.fn();
const handleMenuToggle = jest.fn();
const CreatePost = (
  <AppProvider>
    <PostContent />
    <PostSettings
      editPostSettings={editPostSettings}
      handleMenuToggle={handleMenuToggle}
    />
  </AppProvider>
);

test("posts are created on submit", () => {
  render(CreatePost);
});

test("post settings save button handles save", () => {
  render(CreatePost);
  userEvent.type(screen.getByLabelText(/description/i), "Test description");
  expect(editPostSettings).toBeCalledTimes(1);
  userEvent.click(screen.getByRole("button", { name: /save settings/i }));
 });

 test("post settings close button works correctly", () => {
  render(CreatePost);
  userEvent.click(screen.getByRole("button", { name: /save settings/i }));
  expect(handleMenuToggle).toBeCalledTimes(1)
 });
