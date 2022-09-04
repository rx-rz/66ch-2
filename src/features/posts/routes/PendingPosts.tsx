import { useLayoutEffect } from "react";
import { MainLayout } from "src/components";
import { PendingPosts as Pending } from "../components/PendingPosts/PendingPosts";

export default function PendingPosts() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <MainLayout>
      <Pending />
    </MainLayout>
  );
}
