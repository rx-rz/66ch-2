import { useLocation } from "react-router-dom";

import { useUserContext } from "src/context";
import { PCNav } from "./PCNav";
import { MobileNav } from "./MobileNav";
import { useRef } from "react";

export function Navbar() {
  // destructuring the user from useUserContext hook
  const { user } = useUserContext()!;
  // getting the location of current page
  const location = useLocation();
  // creating a ref for the menu
  const menu = useRef<HTMLDivElement>(null);
  // defining handleMenuToggle function
  const handleMenuToggle = () => {
    // toggling the class 'hidden' on the menu
    menu.current!.classList.toggle("hidden");
  };

  //  if the current location path is '/createpost, do not render the navbar'
  if (location.pathname === "/createpost") {
    return null;
  } else {
    return (
      <nav
        className=" font-supreme bg-white   sticky top-0 z-50 w-full
       mx-auto"
      >
        <div
          className=" h-16 lg:h-16 uppercase w-[95%]
         items-center mx-auto font-bold pb-8"
        >
          <PCNav user={user} handleMenuToggle={handleMenuToggle} />
          <MobileNav user={user} menu={menu} />
        </div>
      </nav>
    );
  }
}
