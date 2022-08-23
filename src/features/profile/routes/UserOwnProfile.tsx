import { MainLayout } from "src/components/Layout/Layout";
import ProfileBanner from "../components/userownprofile/ProfileBanner";
import UserDrafts from "../components/userownprofile/UserDrafts";
import UserPosts from "../components/userownprofile/UserPosts";

export default function UserOwnProfile() {
  return (
    <MainLayout>
      <div className="flex">
        <ProfileBanner />
        <div>
          <UserDrafts />
          <UserPosts />
        </div>
      </div>
    </MainLayout>
  );
}
