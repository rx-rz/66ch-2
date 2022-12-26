import { Navbar } from "../Elements/Navbar/Navbar";
type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className=" h-full flex ">
      <div className="lg:w-5/12 xl:w-3/12 md:w-6/12 w-full my-10 mx-auto">{children}</div>
    </div>
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
