import { useIsPresent, motion } from "framer-motion";
import { MainLayout } from "src/components/Layout/Layout";
import Postlist from "src/features/posts/components/PostList/Postlist";
import HomePage from "../components/HomePage";

export const Home = () => {
  const isPresent = useIsPresent();
  return (
    <>
      <MainLayout>
        <HomePage />
        <Postlist />
      </MainLayout>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: .6, ease: "easeIn" } }}
        exit={{ scaleY: 1, transition: { duration: .6, ease: "easeOut" } }}
        style={{ originY: isPresent ? 0 : 1 }}
        className="inset-0 fixed z-50 bg-yellow-300"
      />
    </>
  );
};
