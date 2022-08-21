import { MainLayout } from "src/components/Layout/Layout";
import Postlist from "src/features/posts/components/PostList/Postlist";
import HomePage from "../components/HomePage";
import { TagMarquee } from "../components/TagMarquee";

export const Home = () => {
  return (
    <MainLayout>
      <HomePage />
      <TagMarquee />
      <Postlist />
    </MainLayout>
  );
};
