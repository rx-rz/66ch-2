import { signOut } from "firebase/auth";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "src/utils/firebaseConfig";

/**The Header Component accepts 3 link items as children and justifies them evenly */
export function Navbar() {
  const [user] = useAuthState(auth);
  const menu = useRef<HTMLDivElement>(null);
  const menubutton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    menu.current!.classList.toggle("hidden");
    menubutton.current!.classList.toggle("bg-primary");
    menubutton.current!.classList.toggle("text-white");
  };

  const handleLogOut = () => {
    signOut(auth);
    navigate("/auth/login");
  };
  return (
    <header>
      <nav className=" h-16 lg:h-24  flex  justify-between items-center border-b border-primary">
        <NavLink
          to="/"
          className="lg:text-5xl text-4xl text-primary  h-full grid font-medium  content-center lg:pr-12 transition-colors duration-300 font-Synonym  ml-4"
        >
          sixtysix-ch
        </NavLink>
        {!user ? (
          <div className="h-full">
            <div className="h-full hidden lg:flex">
              <NavLink
                to="/auth/login"
                className="sm:text-2xl text-xl text-primary hover:text-white hover:bg-primary h-full grid  content-center lg:px-4 border-l border-primary transition-colors duration-300 font-Amulya active:border-b-4"
              >
                SEARCH
              </NavLink>
              <NavLink
                to="/auth/login"
                className="sm:text-2xl text-xl text-primary hover:text-white hover:bg-primary h-full grid  content-center lg:px-4 border-l border-primary transition-colors duration-300 font-Amulya"
              >
                LOGIN
              </NavLink>
              <NavLink
                to="/auth/register"
                className="sm:text-2xl text-xl text-primary hover:text-white hover:bg-primary h-full grid  content-center lg:px-4 border-l border-primary transition-colors duration-300 font-Amulya"
              >
                SIGN UP
              </NavLink>
            </div>
            <div className="h-full lg:hidden block">
              <button
                className="text-primary  h-full grid  content-center px-4 border-l border-primary  font-Synonym"
                onClick={handleMenuToggle}
                ref={menubutton}
              >
                MENU
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <div className="h-full hidden lg:flex">
              <NavLink
                to="/auth/register"
                className="sm:text-2xl text-xl text-primary hover:text-white hover:bg-primary h-full grid  content-center lg:px-4 border-l border-primary transition-colors duration-300 font-Amulya"
              >
                PROFILE
              </NavLink>
              <NavLink
                to="/auth/register"
                className="sm:text-2xl text-xl text-primary hover:text-white hover:bg-primary h-full grid  content-center lg:px-4 border-l border-primary transition-colors duration-300 font-Amulya"
              >
                CREATE POST
              </NavLink>
              <NavLink
                to="/auth/login"
                className="sm:text-2xl text-xl text-primary hover:text-white hover:bg-primary h-full grid  content-center lg:px-4 border-l border-primary transition-colors duration-300 font-Amulya active:border-b-4"
              >
                SEARCH
              </NavLink>
              <button
                onClick={handleLogOut}
                className="sm:text-2xl text-xl text-primary hover:text-white hover:bg-primary h-full grid  content-center lg:px-4 border-l border-primary transition-colors duration-300 font-Amulya"
              >
                LOGOUT
              </button>
            </div>
            <div className="h-full lg:hidden block">
              <button
                className="text-primary h-full grid  content-center px-4 border-l border-primary  font-Synonym"
                onClick={handleMenuToggle}
                ref={menubutton}
              >
                MENU
              </button>
            </div>
          </div>
        )}
      </nav>
      <div
        className=" h-screen hidden lg:hidden bg-primary lg:top-24 top-16 left-0 right-0 bottom-0 fixed"
        ref={menu}
      >
        {!user ? (
          <div className="flex flex-col">
            <NavLink
              to="/auth/login"
              className="text-4xl font-Synonym text-white my-8 ml-4 "
            >
              Search
            </NavLink>
            <NavLink
              to="/auth/login"
              className="text-4xl font-Synonym text-white my-8 ml-4"
            >
              Login
            </NavLink>
            <NavLink
              to="/auth/register"
              className="text-4xl font-Synonym text-white my-8 ml-4"
            >
              Sign Up
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-col">
            <NavLink
              to="/auth/login"
              className="text-4xl font-Synonym text-white my-8 ml-4 mt-14"
            >
              Profile
            </NavLink>
            <NavLink
              to="/auth/login"
              className="text-4xl font-Synonym text-white my-8 ml-4"
            >
              Create Post
            </NavLink>
            <NavLink
              to="/auth/register"
              className="text-4xl font-Synonym text-white my-8 ml-4"
            >
              Search
            </NavLink>
            <button
              onClick={handleLogOut}
              className="text-4xl font-Synonym text-white my-8 ml-4 w-fit"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
