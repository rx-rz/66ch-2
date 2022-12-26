import { useIsPresent } from "framer-motion";

import { MainLayout } from "src/components/Layout/Layout";
import Postlist from "src/features/home/components/Postlist";
import HomePage from "../components/HomePage";

export const Home = () => {
  const isPresent = useIsPresent();
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
