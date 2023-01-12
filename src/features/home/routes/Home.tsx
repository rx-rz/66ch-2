import { MainLayout } from "src/components";
import Postlist from "src/features/home/components/Postlist";
import HomePage from "../components/HomePage";

export const Home = () => {

  document.title = "66CH";

  return (
    <>
      <MainLayout>
        <HomePage />
        <Postlist />
      </MainLayout>
    </>
  );
};
