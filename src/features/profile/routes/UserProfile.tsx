import { MainLayout } from "src/components/Layout/Layout";
import PostDetails from "../components/userownprofile/ProfileBanner";
import UserPosts from "../components/userownprofile/UserPosts";

export const UserProfile = () => {
  return (
    <MainLayout>
      <PostDetails />
      <UserPosts/>
    </MainLayout>
  );
};
