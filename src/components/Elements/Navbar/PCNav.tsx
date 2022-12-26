import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navlink } from "../NavLink/NavLink";
import { auth } from "src/config/firebaseConfig";
import { Button } from "../Button";
import { Switcher } from "./Switcher";
import { useNav } from "./utils";
import { Notifications } from "./Notifications";
import { User } from "src/utils";

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

            <Navlink to="/search" className=" xl:flex">
              <img
                src="/assets/search.svg"
                alt="Search"
                width="20px"
                className="dark:invert"
              />
            </Navlink>

            <div className=" items-center flex">
              <div className="mr-4">
                <Switcher />
              </div>
              <Navlink
                to="/auth/login"
                className="border border-black rounded-full md:p-3 p-2 bg-secondary "
              >
                <img
                  src="/assets/login.svg"
                  alt="Log In"
                  className="invert dark:invert-0"
                  width="20px"
                  title="Login"
                />
              </Navlink>
            </div>
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
                rounded-full hover:b  border-black p-2 hover:border-none
                mr-2 "
            >
              <img
                src={user.photoURL}
                title="Profile"
                alt=""
                width="30px"
                className="rounded-full border border-black mr-2 "
              />
              <p> {user.name.split(" ")[0]}</p>
            </Navlink>

            <div className="flex items-center">
              <div className="mr-4">
                <Switcher />
              </div>
              <div
                className="fixed top-16 h-fit border-2  min-h-[200px] bg-white
                hidden border-black
                 right-0 w-[652px] "
                ref={notifications}
              >
                <p className="text-black">{user.notifications.length}</p>
                <Notifications user={user} />
              </div>

              <Button
                handleClick={handleNotifToggle}
                className="text-md text-tertiary mx-3  h-full flex items-center
               font-medium  content-center lg:px-2  
                transition-colors duration-300 hover:text-secondary"
              >
                <img
                  src="/assets/alert.svg"
                  alt=""
                  className=" dark:invert"
                  width="25px"
                  title="Notifications"
                />
              </Button>
              <Navlink to="/createpost" variant="primary">
                <img
                  alt="Create"
                  src="/assets/create.svg"
                  className="dark:invert"
                  width="24px"
                  title="Create Post"
                />
              </Navlink>

              <Navlink to="/search" variant="primary">
                <img
                  alt="Search"
                  src="/assets/search.svg"
                  width="20px"
                  className="dark:invert"
                  title="Search"
                />
              </Navlink>
              <button
                className="border border-black rounded-full p-3 bg-secondary  ml-4"
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
                className="flex items-center mr-8 
              transition-colors duration-300 hover:text-secondary"
                handleClick={handleMobileNotifToggle}
              >
                <img
                  src="/assets/notification.svg"
                  alt=""
                  width="20px"
                  className="mr-1 dark:invert"
                />
                {user && user.notifications?.length}
              </Button>
              <button
                className="text-tertiary h-full grid font-extrabold  
              content-center   font-pilcrow "
                onClick={handleMenuToggle}
                ref={menubutton}
              >
                <img
                  src="/assets/menu.svg"
                  alt="Menu"
                  width="20px"
                  className="dark:invert"
                />
              </button>

              <div
                className="fixed top-16 h-fit border-2  min-h-[200px] bg-white
                 hidden border-black
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
