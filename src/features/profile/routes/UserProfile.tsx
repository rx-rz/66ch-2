import { MainLayout } from "src/components/Layout/Layout";
import ProfileBanner from "../components/userownprofile/ProfileBanner";
import UserDrafts from "../components/userownprofile/UserDrafts";
import UserPosts from "../components/userownprofile/UserPosts";

export default function UserProfile() {
  return (
    <MainLayout>
      <ProfileBanner />
      <UserDrafts />
      <UserPosts />
    </MainLayout>
  );
}
