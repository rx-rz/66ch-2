const variants = {
  authSecondary:
    "text-xl font-pilcrow lg:w-5/12  rounded-md w-full bg-primary text-tertiary p-3 transition-shadow font-medium duration-300 border-tertiary border hover:shadow-2xl shadow-black",
  authPrimary:
    "text-xl font-pilcrow lg:w-5/12 w-full rounded-md bg-secondary text-white p-3  font-medium transition-shadow duration-300 border-tertiary border hover:shadow-2xl shadow-black mb-8 md:mb-0",
  pendingButton:
    "text-xl font-supreme font-bold lg:w-5/12 mx-3 md:mx-0 bg-secondary text-white p-3 md:mr-4 transition-shadow duration-300 border-tertiary border hover:shadow-2xl shadow-black mb-8 md:mb-0",
  pendingButtonTwo:
    "text-xl font-supreme font-bold lg:w-5/12 mx-3 md:mx-0 bg-primary text-secondary p-3 md:mr-4 transition-shadow duration-300 border-tertiary border hover:shadow-2xl shadow-black mb-8 md:mb-0",
  authTertiary:
    "flex text-2xl  items-center border-secondary border-2 focus:border-4 focus:border-secondary rounded-md flex items-center p-4 transition-opacity duration-300  hover:opacity-80 mx-auto my-8",
  settingsButton:
    "text-xl font-pilcrow self-end w-full mt-8  md:mt-12 bottom-0 mx-auto bg-tertiary border border-primary text-primary p-1 py-2 transition-colors duration-300 hover:bg-primary hover:text-secondary font-bold",
  draft:
    "border-2 border-tertiary  bg-primary px-1 text-secondary md:text-xl text-md font-pilcrow ",
  nav: "text-md transition-colors duration-300 hover:text-secondary px-3 uppercase text-tertiary border-tertiary h-full grid font-medium  content-center lg:px-4",
};

type ButtonProps = {
  text?: string;
  className?: string;
  variant?: keyof typeof variants;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: any;
  children?: React.ReactNode;
};

export function Button({
  text,
  className,
  handleClick,
  children,
  type,
  variant,
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      /*THe button style can either be any of the available variants
      or a specified design style within the classname property. */
      className={variants[variant!] + " " + className}
      data-testid="button"
      type={type}
    >
      {/*Display text/children properties if they are not empty */}
      {text && text} {children && children}
    </button>
  );
}
