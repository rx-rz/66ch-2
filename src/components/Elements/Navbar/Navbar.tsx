import { signOut } from "firebase/auth";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navlink } from "../NavLink/NavLink";
import { auth } from "src/config/firebaseConfig";
import { useUserContext } from "src/context";
import { Button } from "../Button";
import notifButton from "src/assets/notification.svg";
import { useEffect } from "react";

export function Navbar() {
  const { user } = useUserContext()!;
  const menu = useRef<HTMLDivElement>(null);
  const notifications = useRef<HTMLDivElement>(null);
  const mobileNotifications = useRef<HTMLDivElement>(null);
  const menubutton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   // mobileNotifications.current!.classList.contains("hidden") === true &&
  //   //   mobileNotifications.current?.classList.add("hidden");
  //   // notifications.current!.classList.contains("hidden") === true &&
  //   //   notifications.current?.classList.add("hidden");
  // }, [location]);

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
                <Navlink to="/search" variant="primary">
                  Search
                </Navlink>
                <Navlink to="/auth/login" variant="primary">
                  Login
                </Navlink>
                <Navlink to="/auth/register" variant="primary">
                  Sign Up
                </Navlink>
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
                <Button
                  handleClick={handleNotifToggle}
                  className="sm: text-xl text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-2  transition-colors duration-300 dark:text-white"
                >
                  NOTIFICATIONS [{user && user.notifications?.length}]
                </Button>
                <div
                  className="fixed top-16 h-fit border-2  min-h-[200px] bg-white hidden border-black  right-0 w-[640px] dark:text-white"
                  ref={notifications}
                >
                  <div className="mt-4">
                    {user &&
                      user.notifications?.map((notif) => (
                        <div className="py-4 ml-2" key={notif.docId}>
                          <Link
                            to={
                              notif.message !== "failure"
                                ? `/post/${notif.docId}`
                                : `/createpost/${notif.docId}`
                            }
                          >
                            {notif.message}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>

                <Navlink to="/profile" variant="primary">
                  Profile
                </Navlink>

                <Navlink to="/createpost" variant="primary">
                  Create Post
                </Navlink>
                <Navlink to="/search" variant="primary">
                  Search
                </Navlink>
                <button
                  onClick={handleLogOut}
                  className="sm:text-xl text-md  px-3 uppercase text-tertiary border-tertiary h-full grid font-medium  content-center lg:px-4 dark:text-white"
                >
                  Log Out
                </button>
              </div>
              <div className="h-full lg:hidden relative flex">
                <Button
                  className="flex items-center mr-3 dark:invert"
                  handleClick={handleMobileNotifToggle}
                >
                  <img src={notifButton} alt="" width="20px" className="mr-1 " />
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
                  className="fixed top-16 h-fit border-2  min-h-[200px] bg-white hidden border-black  right-0 w-full"
                  ref={mobileNotifications}
                >
                  <div className="mt-4">
                    {user &&
                      user.notifications?.map((notif) => (
                        <div className="py-4 ml-2" key={notif.docId}>
                          <Link
                            to={
                              notif.message !== "failure"
                                ? `/post/${notif.docId}`
                                : `/createpost/${notif.docId}`
                            }
                          >
                            {notif.message}
                          </Link>
                        </div>
                      ))}
                  </div>
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
              <Navlink to="/search" variant="mobile">
                Search
              </Navlink>
              <Navlink to="/auth/login" variant="mobile">
                Login
              </Navlink>
              <Navlink to="/auth/register" variant="mobile">
                Sign Up
              </Navlink>
            </div>
          ) : (
            <div className="flex flex-col">
              <Navlink to="/profile" variant="mobile">
                Profile
              </Navlink>

              <Navlink to="/createpost" variant="mobile">
                Create Post
              </Navlink>
              <Navlink to="/search" variant="mobile">
                Search
              </Navlink>
              <button
                onClick={handleLogOut}
                className="text-2xl font-pilcrow text-primary font-medium my-8 ml-4 w-fit"
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
