import { useLayoutEffect } from "react";
import { MainLayout } from "src/components/Layout/Layout";
import ProfileBanner from "../components/userprofiles/ProfileBanner";
import UserPosts from "../components/userprofiles/UserPosts";

export default function UserProfile() {
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <MainLayout>
          <ProfileBanner />
          <UserPosts />
    </MainLayout>
  );
}
