import { signOut } from "firebase/auth";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navlink } from "../NavLink/NavLink";
import { auth } from "src/config/firebaseConfig";
import { usePostContext, useUserContext } from "src/context";
import { Button } from "../Button";
import notifButton from "src/assets/notification.svg";
import { Switcher } from "./Switcher";
import { mobileLinks, mobileLinksAuth, pcLinks, pcLinksAuth } from "./utils";
import { Notifications } from "./Notifications";

export function Navbar() {
  const { user } = useUserContext()!;
  const { data } = usePostContext()!;
  const menu = useRef<HTMLDivElement>(null);
  const notifications = useRef<HTMLDivElement>(null);
  const mobileNotifications = useRef<HTMLDivElement>(null);
  const menubutton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const pendingPosts =
    data && user && user.role === "admin"
      ? data.filter((doc) => doc.status === "pending")
      : data &&
        data.filter(
          (doc) => doc.status === "pending" && doc.author.id === user?.uid
        );

  const handleMenuToggle = () => {
    menu.current!.classList.toggle("hidden");
  };
  const handleNotifToggle = () => {
    notifications.current!.classList.toggle("hidden");
  };
  const handleMobileNotifToggle = () => {
    mobileNotifications.current!.classList.toggle("hidden");
  };

  const location = useLocation();

  const handleLogOut = () => {
    signOut(auth);
    navigate("/auth/login");
  };
  if (location.pathname === "/createpost") {
    return null;
  } else {
    return (
      <nav className=" font-pilcrow bg-white sticky top-0 z-50 w-full mx-auto border-2 border-black dark:bg-tertiary dark:border-b-primary">
        <div className=" h-16 lg:h-16 uppercase flex  justify-between items-center mx-2">
          <Navlink to="/" variant="main">
            6 6 C H
          </Navlink>
          {!user ? (
            <div className="h-full">
              <div className="h-full hidden lg:flex">
                <Switcher />
                {pcLinks.map((pcLink) => (
                  <Navlink to={pcLink.linkTo} variant="primary">
                    {pcLink.name}
                  </Navlink>
                ))}
              </div>
              <div className="h-full lg:hidden block">
                <button
                  className="text-tertiary  h-full grid font-extrabold  content-center   font-pilcrow dark:text-white"
                  onClick={handleMenuToggle}
                  ref={menubutton}
                >
                  MENU
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <div className="h-full hidden lg:flex relative">
                <Switcher />
                <Navlink variant="primary" to="/pendingposts">
                  PENDING POSTS [{pendingPosts && pendingPosts.length}]
                </Navlink>

                <Button
                  handleClick={handleNotifToggle}
                  className="sm: text-xl text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-2  dark:text-white transition-colors duration-300 hover:text-secondary"
                >
                  NOTIFICATIONS [{user && user.notifications?.length}]
                </Button>
                <div
                  className="fixed top-16 h-fit border-2  min-h-[200px] bg-white dark:border-white dark:bg-tertiary hidden border-black  right-0 w-[652px] dark:text-white"
                  ref={notifications}
                >
                  <Notifications user={user} />
                </div>

                {pcLinksAuth.map((pcLink) => (
                  <Navlink to={pcLink.linkTo} variant="primary" key={pcLink.name}>
                    {pcLink.name}
                  </Navlink>
                ))}

                <Button handleClick={handleLogOut} variant="nav">
                  Log Out
                </Button>
              </div>
              <div className="h-full lg:hidden relative flex">
                <div className="mr-8 flex items-center">
                  <Switcher />
                </div>
                <Button
                  className="flex items-center mr-8 dark:invert transition-colors duration-300 hover:text-secondary"
                  handleClick={handleMobileNotifToggle}
                >
                  <img
                    src={notifButton}
                    alt=""
                    width="20px"
                    className="mr-1 "
                  />
                  {user && user.notifications?.length}
                </Button>
                <button
                  className="text-tertiary h-full grid font-extrabold  content-center   font-pilcrow dark:text-white"
                  onClick={handleMenuToggle}
                  ref={menubutton}
                >
                  MENU
                </button>

                <div
                  className="fixed top-16 h-fit border-2  min-h-[200px] bg-white dark:bg-tertiary dark:border-white  hidden border-black  right-0 w-full"
                  ref={mobileNotifications}
                >
                  <Notifications user={user} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className=" hidden lg:hidden bg-tertiary top-16 left-0 right-0  fixed z-20 h-screen"
          ref={menu}
        >
          {!user ? (
            <div className="flex flex-col">
              {mobileLinks.map((mobileLink) => (
                <Navlink to={mobileLink.linkTo} variant="mobile" key={mobileLink.name}>
                  {mobileLink.name}
                </Navlink>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <Navlink variant="mobile" to="/pendingposts">
                Pending Posts [{pendingPosts && pendingPosts.length}]
              </Navlink>
              {mobileLinksAuth.map((mobileLink) => (
                <Navlink to={mobileLink.linkTo} variant="mobile" key={mobileLink.name}>
                  {mobileLink.name}
                </Navlink>
              ))}
              <button
                onClick={handleLogOut}
                className="text-2xl font-pilcrow text-primary font-medium my-8 ml-4 w-fit transition-colors duration-300 hover:text-secondary"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
