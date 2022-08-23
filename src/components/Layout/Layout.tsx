import { Navbar } from "../Elements/Navbar/Navbar";
import authAvif from "src/assets/authimage.avif";
import authJpg from "src/assets/authimage.jpg";
import authWebp from "src/assets/authimage.webp";
import { motion } from "framer-motion";
type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className=" h-full flex dark:bg-tertiary">
        <picture className="lg:block hidden w-8/12 bg-black">
          <source
            srcSet={authAvif}
            type="image/avif"
            className="h-screen object-cover "
          />
          <source
            srcSet={authWebp}
            type="image/webp"
            className="h-screen object-cover "
          />
          <img src={authJpg} alt="#" className="h-full object-cover " />
        </picture>
        <div className="lg:w-4/12 w-full my-10">{children}</div>
      </div>
    </motion.div>
  );
}

type MainLayoutProps = {
  children: React.ReactNode;
};
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
