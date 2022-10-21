import { NavLink } from "react-router-dom";

const variants = {
  main: "lg:text-3xl text-2xl md:text-3xl text-tertiary  h-full grid f font-medium  content-center transition-colors duration-300 font-pilcrow dark:text-white hover:text-secondary",
  primary:
    "text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-1 dark:text-white active:border-b-2 active:border-b-black dark:active:border-b-white ",
  mobile: "text-2xl font-pilcrow text-primary font-medium my-8 ml-4 my-7",
};
type NavLinkProps = {
  variant?: keyof typeof variants;
  to: string;
  children: React.ReactNode;
  className?: string;
};

export const Navlink = ({ variant, to, children, className }: NavLinkProps) => {
  if (variant) {
    return (
      <NavLink to={to} className={variants[variant!]}>
        {children}
      </NavLink>
    );
  } else {
    return (
      <NavLink to={to} className={className}>
        {children}
      </NavLink>
    );
  }
};
