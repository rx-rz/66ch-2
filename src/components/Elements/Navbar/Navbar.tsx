import { signOut } from "firebase/auth";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "src/utils/firebaseConfig";

/**The Header Component accepts 3 link items as children and justifies them evenly */
export function Navbar() {
  const [user] = useAuthState(auth);
  const menu = useRef<HTMLDivElement>(null);
  const menubutton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    menu.current!.classList.toggle("hidden");
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
      <header className="w-11/12 mx-auto md:py-8 py-4  sticky top-0  z-50">
        <nav className=" h-16 lg:h-24  flex  justify-between items-center">
          <NavLink
            to="/"
            className="lg:text-5xl text-3xl md:text-4xl text-primary  h-full grid f font-medium  content-center transition-colors duration-300 font-Synonym"
          >
            6 6 C H
          </NavLink>
          {!user ? (
            <div className="h-full">
              <div className="h-full hidden lg:flex">
                <NavLink
                  to="/search"
                  className="sm:text-xl text-md text-primary hover:text-white mx-3 hover:bg-primary h-full grid font-medium  content-center lg:px-4  transition-colors duration-300 font-Amulya active:border-b-4"
                >
                  Search
                </NavLink>
                <NavLink
                  to="/auth/login"
                  className="sm:text-xl text-md text-primary hover:text-white mx-3 hover:bg-primary h-full grid font-medium  content-center lg:px-4  transition-colors duration-300 font-Amulya"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="sm:text-xl text-md text-white  px-3 bg-primary h-full grid font-medium  content-center lg:px-4 font-Amulya"
                >
                  Sign Up
                </NavLink>
              </div>
              <div className="h-full lg:hidden block">
                <button
                  className="text-primary  h-full grid font-extrabold  content-center   font-Synonym"
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
                {location.pathname !== "/profile" ? (
                  <NavLink
                    to="/profile"
                    className="sm:text-xl text-md text-primary hover:text-white mx-3 hover:bg-primary h-full grid font-medium  content-center lg:px-4  transition-colors duration-300 font-Amulya"
                  >
                    Profile
                  </NavLink>
                ) : null}

                <NavLink
                  to="/createpost"
                  className="sm:text-xl text-md text-primary hover:text-white mx-3 hover:bg-primary h-full grid font-medium  content-center lg:px-2  transition-colors duration-300 font-Amulya"
                >
                  Create Post
                </NavLink>
                <NavLink
                  to="/search"
                  className="sm:text-xl text-md text-primary hover:text-white mx-3 hover:bg-primary h-full grid font-medium  content-center lg:px-4  transition-colors duration-300 font-Amulya active:border-b-4"
                >
                  Search
                </NavLink>
                <button
                  onClick={handleLogOut}
                  className="sm:text-xl text-md text-white  px-3 bg-primary h-full grid font-medium  content-center lg:px-4 font-Amulya"
                >
                  Log Out
                </button>
              </div>
              <div className="h-full lg:hidden block">
                <button
                  className="text-primary h-full grid font-extrabold  content-center   font-Synonym"
                  onClick={handleMenuToggle}
                  ref={menubutton}
                >
                  MENU
                </button>
              </div>
            </div>
          )}
        </nav>
        <nav
          className=" hidden lg:hidden bg-primary md:top-32 top-24 left-0 right-0 bottom-0 fixed z-50"
          ref={menu}
        >
          {!user ? (
            <div className="flex flex-col">
              <NavLink
                to="/search"
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
              {location.pathname !== "/profile" ? (
                <NavLink
                  to="/profile"
                  className="text-4xl font-Synonym text-white my-8 ml-4 mt-14"
                >
                  Profile
                </NavLink>
              ) : null}
              <NavLink
                to="/createpost"
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
        </nav>
      </header>
    );
  }
}
