import { Navbar } from "../Elements/Navbar/Navbar";
import authAvif from "src/assets/authimage.avif";
import authJpg from "src/assets/authimage.jpg";
import authWebp from "src/assets/authimage.webp";
type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen">
      <picture className="lg:block hidden w-8/12 bg-black">
        <source srcSet={authAvif} type="image/avif" className="h-screen object-cover grayscale"/>
        <source srcSet={authWebp} type="image/webp" className="h-screen object-cover grayscale"/>
        <img src={authJpg} alt="#" className="h-screen object-cover grayscale"/>
      </picture>
      <div className="lg:w-4/12 w-full">{children}</div>
    </div>
  );
}

type MainLayoutProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
