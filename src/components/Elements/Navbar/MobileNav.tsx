import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "src/config/firebaseConfig";
import { User } from "src/utils";
import { Navlink } from "../NavLink";
import { mobileLinks, mobileLinksAuth, useNav } from "./utils";
type MobileNavProps = {
  user: User | null | undefined;
  menu: React.RefObject<HTMLDivElement>;
};
export const MobileNav = ({ user, menu }: MobileNavProps) => {
  const { pendingPosts } = useNav();
  const navigate = useNavigate();
  const handleLogOut = () => {
    signOut(auth);
    navigate("/auth/login");
  };
  return (
    <div
      className=" hidden xl:hidden bg-secondary top-16
     left-0 right-0  fixed z-20 h-screen"
      ref={menu}
    >
      {!user ? (
        <div className="flex flex-col">
          {mobileLinks.map((mobileLink) => (
            <Navlink
              to={mobileLink.linkTo}
              variant="mobile"
              key={mobileLink.name}
            >
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
            <Navlink
              to={mobileLink.linkTo}
              variant="mobile"
              key={mobileLink.name}
            >
              {mobileLink.name}
            </Navlink>
          ))}
          <button
            onClick={handleLogOut}
            className="text-2xl font-pilcrow text-primary font-medium my-8
             ml-4 w-fit transition-colors duration-300 hover:text-secondary"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
