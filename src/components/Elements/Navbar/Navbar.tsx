import { signOut } from "firebase/auth";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navlink } from "../NavLink/NavLink";
import { auth, database } from "src/config/firebaseConfig";
import { usePostContext, useUserContext } from "src/context";
import { Button } from "../Button";
import deleteButton from "src/assets/delete.svg";
import notifButton from "src/assets/notification.svg";
import { doc, updateDoc } from "firebase/firestore";
import { Switcher } from "./Switcher";

export function Navbar() {
  const { user } = useUserContext()!;
  const { data } = usePostContext()!;
  const menu = useRef<HTMLDivElement>(null);
  const notifications = useRef<HTMLDivElement>(null);
  const mobileNotifications = useRef<HTMLDivElement>(null);
  const menubutton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const pclinks = {
    
  };

  const handleNotifDelete = (id: string) => {
    const newNotifcations =
      user && user.notifications.filter((notif) => notif.docId !== id);
    updateDoc(doc(database, "users", user?.id!), {
      notifications: [...newNotifcations!],
    });
  };

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
                  <div className="my-4">
                    {user.notifications?.length > 0 ? (
                      user.notifications?.map((notif) => (
                        <div
                          className="py-4 ml-2 flex justify-around"
                          key={notif.docId}
                        >
                          <Link
                            to={
                              notif.message === "success"
                                ? `/post/${notif.docId}`
                                : `/createpost/${notif.docId}`
                            }
                          >
                            <div className="w-10/12 dark:text-white">
                              <p>{notif.message}</p>
                              <p>{notif.dateCreated}</p>
                            </div>
                          </Link>
                          <Button
                            className="w-fit h-fit"
                            handleClick={() => handleNotifDelete(notif.docId)}
                          >
                            <img
                              src={deleteButton}
                              alt="Delete Notification"
                              className="dark:invert"
                              width="30px"
                            />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center mt-20 dark:text-white">
                        You have no new notifications. 😶
                      </p>
                    )}
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
                <Button handleClick={handleLogOut} variant="nav">
                  Log Out
                </Button>
              </div>
              <div className="h-full lg:hidden relative flex">
                <Button
                  className="flex items-center mr-3 dark:invert transition-colors duration-300 hover:text-secondary"
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
                  <div className="mt-4 ">
                    {user.notifications?.length > 0 ? (
                      user.notifications?.map((notif) => (
                        <div
                          className="py-4 ml-2 flex justify-around"
                          key={notif.docId}
                        >
                          <Link
                            to={
                              notif.message === "success"
                                ? `/post/${notif.docId}`
                                : `/createpost/${notif.docId}`
                            }
                          >
                            <div className="w-10/12 dark:text-white">
                              <p>{notif.message}</p>
                              <p>{notif.dateCreated}</p>
                            </div>
                          </Link>
                          <Button
                            className="w-fit"
                            handleClick={() => handleNotifDelete(notif.docId)}
                          >
                            <img
                              src={deleteButton}
                              className="dark:invert"
                              alt="Delete Notification"
                              width="30px"
                            />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center mt-20 dark:text-white">
                        You have no new notifications. 😶
                      </p>
                    )}
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

              <Navlink variant="mobile" to="/pendingposts">
                Pending Posts [{pendingPosts && pendingPosts.length}]
              </Navlink>

              <Navlink to="/search" variant="mobile">
                Search
              </Navlink>
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
