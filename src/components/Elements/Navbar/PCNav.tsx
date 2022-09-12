import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navlink } from "../NavLink/NavLink";
import { auth } from "src/config/firebaseConfig";
import { Button } from "../Button";
import notifButton from "src/assets/notification.svg";
import { Switcher } from "./Switcher";
import { pcLinks, pcLinksAuth, useNav } from "./utils";
import { Notifications } from "./Notifications";
import { User } from "src/utils";

type PCNavProps = {
  user: User | null | undefined;
  handleMenuToggle: () => void
};
export const PCNav = ({ user, handleMenuToggle }: PCNavProps) => {
  const {
    pendingPosts,
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
        <div className="h-full">
          <div className="h-full hidden xl:flex">
            <Switcher />
            {pcLinks.map((pcLink) => (
              <Navlink to={pcLink.linkTo} variant="primary" key={pcLink.name}>
                {pcLink.name}
              </Navlink>
            ))}
          </div>
          <div className="h-full xl:hidden block">
            <button
              className="text-tertiary  h-full grid font-extrabold
                content-center   font-pilcrow dark:text-white"
              onClick={handleMenuToggle}
              ref={menubutton}
            >
              MENU
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full">
          <div className="h-full hidden xl:flex relative">
            <Switcher />
            <Navlink variant="primary" to="/pendingposts">
              PENDING POSTS [{pendingPosts && pendingPosts.length}]
            </Navlink>

            <Button
              handleClick={handleNotifToggle}
              className="sm: text-xl text-md text-tertiary mx-3  h-full grid
               font-medium  content-center lg:px-2  dark:text-white
                transition-colors duration-300 hover:text-secondary"
            >
              NOTIFICATIONS [{user && user.notifications?.length}]
            </Button>
            <div
              className="fixed top-16 h-fit border-2  min-h-[200px] bg-white
               dark:border-white dark:bg-tertiary hidden border-black
                 right-0 w-[652px] dark:text-white"
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
          <div className="h-full xl:hidden relative flex">
            <div className="mr-8 flex items-center">
              <Switcher />
            </div>
            <Button
              className="flex items-center mr-8 dark:invert 
              transition-colors duration-300 hover:text-secondary"
              handleClick={handleMobileNotifToggle}
            >
              <img src={notifButton} alt="" width="20px" className="mr-1 " />
              {user && user.notifications?.length}
            </Button>
            <button
              className="text-tertiary h-full grid font-extrabold  
              content-center   font-pilcrow dark:text-white"
              onClick={handleMenuToggle}
              ref={menubutton}
            >
              MENU
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
      )}
    </>
  );
};
