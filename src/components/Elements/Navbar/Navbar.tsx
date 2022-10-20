import { useLocation } from "react-router-dom";
import { Navlink } from "../NavLink/NavLink";

import { useUserContext } from "src/context";
import { PCNav } from "./PCNav";
import { MobileNav } from "./MobileNav";
import { useRef } from "react";

export function Navbar() {
  const { user } = useUserContext()!;
  const location = useLocation();

  const menu = useRef<HTMLDivElement>(null);
  const handleMenuToggle = () => {
    menu.current!.classList.toggle("hidden");
  };

  if (location.pathname === "/createpost") {
    return null;
  } else {
    return (
      <nav
        className=" font-pilcrow bg-white sticky top-0 z-50 w-full
       mx-auto  "
      >
        <div
          className=" h-16 lg:h-16 uppercase 
         items-center mx-8"
        >
          <PCNav user={user} handleMenuToggle={handleMenuToggle} />
          <MobileNav user={user} menu={menu} />
        </div>
      </nav>
    );
  }
}
