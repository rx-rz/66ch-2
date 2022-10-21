import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navlink } from "../NavLink/NavLink";
import { auth } from "src/config/firebaseConfig";
import { Button } from "../Button";
import { Switcher } from "./Switcher";
import { pcLinks, pcLinksAuth, useNav } from "./utils";
import { Notifications } from "./Notifications";
import { User } from "src/utils";
import { useRef } from "react";

type PCNavProps = {
  user: User | null | undefined;
  handleMenuToggle: () => void;
};

export const PCNav = ({ user, handleMenuToggle }: PCNavProps) => {
  const {
    // pendingPosts,
    handleNotifToggle,
    handleMobileNotifToggle,
    notifications,
    mobileNotifications,
    menubutton,
  } = useNav();
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleModalOpen = () => {
    dialogRef.current?.classList.toggle("hidden");
  };

  const handleModalClose = () => {
    dialogRef.current?.classList.toggle("hidden");
  };

  const handleLogOut = () => {
    signOut(auth);
    navigate("/auth/login");
  };

  return (
    <>
      {!user ? (
        <div className="h-full justify-between">
          <div className="h-full flex justify-between items-center">
            <Navlink to="/" variant="main">
              6 6 C H
            </Navlink>

            <Navlink to="/search" className="hidden xl:flex">
              <img src="/assets/search.svg" alt="Search" width="20px" />
            </Navlink>

            <div className="xl:flex items-center hidden">
              <div className="mr-4">
                <Switcher />
              </div>
              {pcLinks.map((pcLink) => (
                <Navlink to={pcLink.linkTo} variant="primary" key={pcLink.name}>
                  {pcLink.name}
                </Navlink>
              ))}
            </div>
            <button
              className="text-tertiary  h-full grid font-extrabold
                content-center   font-pilcrow dark:text-white xl:hidden"
              onClick={handleMenuToggle}
              ref={menubutton}
            >
              MENU
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full">
          <div className="h-full hidden xl:flex relative justify-between items-center">
            <Navlink to="/" variant="main">
              6 6 C H
            </Navlink>

            <Navlink
              to="/profile"
              className="flex items-center border hover:bg-secondary
               hover:text-white transition-colors duration-300
                rounded-full hover:b  border-black p-2 hover:border-none mr-2"
            >
              <img
                src={user.photoURL}
                title="Profile"
                alt=""
                width="30px"
                className="rounded-full border border-black mr-2"
              />
              <p> {user.name.split(" ")[0]}</p>
            </Navlink>

            {/* <Navlink variant="primary" to="/pendingposts">
              PENDING POSTS [{pendingPosts && pendingPosts.length}]
            </Navlink> */}

            <div className="flex items-center">
              <div className="mr-4">
                <Switcher />
              </div>
              <div
                className="fixed top-16 h-fit border-2  min-h-[200px] bg-white
               dark:border-white dark:bg-tertiary hidden border-black
                 right-0 w-[652px] "
                ref={notifications}
              >
                <p className="text-black">{user.notifications.length}</p>
                <Notifications user={user} />
              </div>

              <Button
                handleClick={handleNotifToggle}
                className="text-md text-tertiary mx-3  h-full flex items-center
               font-medium  content-center lg:px-2  dark:text-white
                transition-colors duration-300 hover:text-secondary"
              >
                <img
                  src="/assets/alert.svg"
                  alt=""
                  width="25px"
                  title="Notifications"
                />
                {/* <p> {user && user.notifications?.length}</p> */}
              </Button>
              <Navlink to="/createpost" variant="primary">
                <img
                  alt="Create"
                  src="/assets/create.svg"
                  width="24px"
                  title="Create Post"
                />
              </Navlink>

              <Navlink to="/search" variant="primary">
                <img
                  alt="Search"
                  src="/assets/search.svg"
                  width="20px"
                  title="Search"
                />
              </Navlink>
              <button
                className="border border-black rounded-full p-3 bg-secondary"
                onClick={handleLogOut}
              >
                <img
                  src="/assets/logout.svg"
                  alt="Log Out"
                  width="15px"
                  className="invert"
                  title="Log Out"
                />
              </button>
            </div>
          </div>
          <div className="h-full xl:hidden relative flex justify-between">
            <Navlink to="/" variant="main">
              6 6 C H
            </Navlink>
            <div className="flex">
              <div className="mr-8 flex items-center">
                <Switcher />
              </div>
              <Button
                className="flex items-center mr-8 dark:invert 
              transition-colors duration-300 hover:text-secondary"
                handleClick={handleMobileNotifToggle}
              >
                <img
                  src="/assets/notification.svg"
                  alt=""
                  width="20px"
                  className="mr-1 "
                />
                {user && user.notifications?.length}
              </Button>
              <button
                className="text-tertiary h-full grid font-extrabold  
              content-center   font-pilcrow dark:text-white"
                onClick={handleMenuToggle}
                ref={menubutton}
              >
                <img src="/assets/menu.svg" alt="Menu" width="20px" />
              </button>

              <div
                className="fixed top-16 h-fit border-2  min-h-[200px] bg-white
               dark:bg-tertiary dark:border-white  hidden border-black
                 right-0 w-full"
                ref={mobileNotifications}
              >
                <Notifications user={user} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
