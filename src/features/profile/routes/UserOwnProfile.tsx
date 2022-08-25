import { MainLayout } from "src/components/Layout/Layout";
import ProfileBanner from "../components/userownprofile/ProfileBanner";
import UserDrafts from "../components/userownprofile/UserDrafts";
import UserPosts from "../components/userownprofile/UserPosts";

export default function UserOwnProfile() {
  return (
    <MainLayout>
      <div className="flex flex-wrap">
        <div className="md:w-4/12 lg:w-3/12 w-full md:sticky md:top-20 bg-secondary border-2 border-black dark:border-white">
          <ProfileBanner />
        </div>
        <div className="md:w-8/12 lg:w-9/12 md:border-l-2 md:border-l-secondary">
          <UserDrafts />
          <div className="md:border-2 dark:border-white border-white"></div>
          <UserPosts />
        </div>
      </div>
    </MainLayout>
  );
}
