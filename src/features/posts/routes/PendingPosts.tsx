import { MainLayout } from "src/components";
import { PendingPosts as Pending } from "../components/PendingPosts/PendingPosts";

export default function PendingPosts() {
  return (
    <MainLayout>
      <Pending />
    </MainLayout>
  );
}
