import { useLayoutEffect } from "react";
import { MainLayout } from "src/components";
import { SearchPosts } from "../components/SearchPost/SearchPosts";

export default function PostSearch() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <MainLayout>
      <SearchPosts />
    </MainLayout>
  );
}
