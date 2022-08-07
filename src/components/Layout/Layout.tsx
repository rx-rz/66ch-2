import { Navbar } from "../Elements/Navbar/Navbar";
type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="lg:block hidden w-8/12 bg-black"></div>
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
