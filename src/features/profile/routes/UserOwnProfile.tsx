import { useLayoutEffect } from "react";
import { MainLayout } from "src/components/Layout/Layout";
import ProfileBanner from "../components/userownprofile/ProfileBanner";
import UserDrafts from "../components/userownprofile/UserDrafts";
import UserPosts from "../components/userownprofile/UserPosts";

export default function UserOwnProfile() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <MainLayout>
      <ProfileBanner />
      <UserDrafts />
      <UserPosts />
    </MainLayout>
  );
}
