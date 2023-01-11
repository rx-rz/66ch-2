import { useRef } from "react";

import { usePostContext, useUserContext } from "src/context";

export const pcLinks = [
  {
    name: "Login",
    variant: "primary",
    linkTo: "/auth/login",
    url: "/assets/login.svg",
  },
  { name: "Register", variant: "primary", linkTo: "/auth/register", url: "" },
];

export const mobileLinks = [
  { name: "Search", variant: "mobile", linkTo: "/search" },
  { name: "Login", variant: "mobile", linkTo: "/auth/login" },
  { name: "Register", variant: "mobile", linkTo: "/auth/register" },
];

export const pcLinksAuth = [
  {
    name: "Create Post",
    variant: "primary",
    linkTo: "/createpost",
    url: "/assets/create.svg",
  },
  {
    name: "Search",
    variant: "primary",
    linkTo: "/search",
    url: "/assets/search.svg",
  },
];

export const mobileLinksAuth = [
  { name: "Profile", variant: "mobile", linkTo: "/profile" },
  { name: "Create Post", variant: "mobile", linkTo: "/createpost" },
  { name: "Search", variant: "mobile", linkTo: "/search" },
];

export const useNav = () => {
  // Get current logged in user from context
  const { user } = useUserContext()!;
  // Get current posts from context
  const { data: posts } = usePostContext()!;
  // Create refs for DOM elements to be manipulated later
  const menu = useRef<HTMLDivElement>(null);
  const notifications = useRef<HTMLDivElement>(null);
  const mobileNotifications = useRef<HTMLDivElement>(null);
  const menubutton = useRef<HTMLButtonElement>(null);

  // filter the pending posts based on user role
  const pendingPosts =
    // check if posts and user exists and user is an admin
    posts && user && user.role === "admin"
      ? // if true, filter all posts with status of "pending"
        posts.filter((doc) => doc.status === "pending")
      : // if false, filter all posts written by the current logged in user with status of "pending"
        posts &&
        posts.filter(
          (doc) => doc.status === "pending" && doc.author.id === user?.uid
        );

  // handleNotifToggle function toggles the visibility of the notifications menu
  const handleNotifToggle = () => {
    // Toggles the class 'hidden' on the current value of the notifications ref
    notifications.current!.classList.toggle("hidden");
  };
  // handleMobileNotifToggle function toggles the visibility of the mobile notifications menu
  const handleMobileNotifToggle = () => {
    // Toggles the class 'hidden' on the current value of the mobileNotifications ref
    mobileNotifications.current!.classList.toggle("hidden");
  };

  return {
    menu,
    posts,
    notifications,
    mobileNotifications,
    menubutton,
    pendingPosts,
    handleMobileNotifToggle,
    handleNotifToggle,
  };
};
