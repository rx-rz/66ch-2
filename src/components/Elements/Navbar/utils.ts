import { useRef } from "react";
import { usePostContext, useUserContext } from "src/context";

export const pcLinks = [
  { name: "Search", variant: "primary", linkTo: "/search" },
  { name: "Login", variant: "primary", linkTo: "/auth/login" },
  { name: "Register", variant: "primary", linkTo: "/auth/register" },
];

export const mobileLinks = [
  { name: "Search", variant: "mobile", linkTo: "/search" },
  { name: "Login", variant: "mobile", linkTo: "/auth/login" },
  { name: "Register", variant: "mobile", linkTo: "/auth/register" },
];

export const pcLinksAuth = [
  { name: "Profile", variant: "primary", linkTo: "/profile" },
  { name: "Create Post", variant: "primary", linkTo: "/createpost" },
  { name: "Search", variant: "primary", linkTo: "/search" },
];

export const mobileLinksAuth = [
  { name: "Profile", variant: "mobile", linkTo: "/profile" },
  { name: "Create Post", variant: "mobile", linkTo: "/createpost" },
  { name: "Search", variant: "mobile", linkTo: "/search" },
];

export const useNav = () => {
  const { user } = useUserContext()!;
  const { data: posts } = usePostContext()!;
  const menu = useRef<HTMLDivElement>(null);
  const notifications = useRef<HTMLDivElement>(null);
  const mobileNotifications = useRef<HTMLDivElement>(null);
  const menubutton = useRef<HTMLButtonElement>(null);

  const pendingPosts =
    posts && user && user.role === "admin"
      ? posts.filter((doc) => doc.status === "pending")
      : posts &&
        posts.filter(
          (doc) => doc.status === "pending" && doc.author.id === user?.uid
        );

  const handleNotifToggle = () => {
    notifications.current!.classList.toggle("hidden");
  };
  const handleMobileNotifToggle = () => {
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
