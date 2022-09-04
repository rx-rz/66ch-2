import { useLayoutEffect } from "react";
import { MainLayout } from "src/components/Layout/Layout";
import UpdateProfile from "../components/updateprofile/UpdateProfile";
export default function UpdateUserProfile() {

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <MainLayout>
      <UpdateProfile />
    </MainLayout>
  );
}
