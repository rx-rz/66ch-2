import React from "react";
import { MainLayout } from "src/components/Layout/Layout";
import { SearchPosts } from "../components/SearchPost/SearchPosts";

export default function PostSearch() {
  return (
    <MainLayout>
      <SearchPosts />
    </MainLayout>
  );
}
