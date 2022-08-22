import { MainLayout } from "src/components/Layout/Layout";
import ProfileBanner from "../components/userprofiles/ProfileBanner";
import UserPosts from "../components/userprofiles/UserPosts";

export default function UserProfile() {
  return (
    <MainLayout>
      <ProfileBanner />
      <UserPosts />
    </MainLayout>
  );
}
