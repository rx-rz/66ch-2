import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "src/config/firebaseConfig";
import { User } from "src/utils";
import { Navlink } from "../NavLink";
import { mobileLinks, useNav } from "./utils";
type MobileNavProps = {
  user: User | null | undefined;
  menu: React.RefObject<HTMLDivElement>;
};
export const MobileNav = ({ user, menu }: MobileNavProps) => {
  //  destructuring the pendingPosts state from the useNav hook
  const { pendingPosts } = useNav();
  // getting the navigate function from useNavigate hook
  const navigate = useNavigate();
  // defining handleLogOut function
  const handleLogOut = () => {
    // calling signOut function with auth as an argument
    signOut(auth);
    //navigating to '/auth/login'
    navigate("/auth/login");
  };

  return (
    <div
      className=" hidden xl:hidden bg-secondary top-16
     right-0  fixed z-20  w-40 border text-white"
      ref={menu}
    >
      {/*if the user is not logged in, display this part of the JSX */}
      {!user ? (
        <div className="flex flex-col mx-2">
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
        <div className="flex flex-col mx-2">
          {/*If the user is logged in, display this part instead. */}
          <Navlink
            to="/profile"
            className="flex items-center 
              text-white mt-8
"
          >
            <img
              src={user.photoURL}
              title="Profile"
              alt=""
              width="30px"
              className="rounded-full border-2 border-black mr-2  p-4 ml-1"
            />
            <p> {user.name.split(" ")[0]}</p>
          </Navlink>
          <Navlink to="/pendingposts" className="flex mt-4 items-center">
            <img
              src="/assets/pending.svg"
              alt="Pending Posts"
              width="40px"
              className="invert"
            />
            <p className="ml-2"> [{pendingPosts && pendingPosts.length}]</p>
          </Navlink>
          <Navlink to="/createpost" className="flex mt-4 items-center">
            <img
              src="/assets/create.svg"
              alt="Create Post"
              width="35px"
              className="invert"
            />
            <p className="ml-2">CREATE POST</p>
          </Navlink>

          <button onClick={handleLogOut} className="flex items-center my-5">
            <img
              src="/assets/logout.svg"
              alt=""
              width="30px"
              className="invert ml-1"
            />
            <p className="ml-3">LOG OUT</p>
          </button>
        </div>
      )}
    </div>
  );
};
