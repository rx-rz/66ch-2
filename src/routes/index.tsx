import { Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRoutes } from "react-router-dom";
import PageNotFound from "src/features/404/PageNotFound";
import { Home } from "src/features/home/routes/Home";
import Postlist from "src/features/posts/components/PostList/Postlist";
import CreatePost from "src/features/posts/routes/CreatePost";
import { PostContent } from "src/features/posts/routes/PostContent";
import { PostSearch } from "src/features/posts/routes/SearchPosts";
import { UpdateUserProfile } from "src/features/profile/routes/UpdateUserProfile";
import { UserProfile } from "src/features/profile/routes/UserProfile";
import { auth } from "src/utils/firebaseConfig";
import { authRoutes } from "./public";

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/postlist", element: <Postlist /> },
    { path: "/post/:id", element: <PostContent /> },
    { path: "/search", element: <PostSearch /> },
    { path: "*", element: <PageNotFound /> },
  ];

  const authenticatedRoutes = [
    { path: "/createpost", element: <CreatePost /> },
    { path: "/createpost/:id", element: <CreatePost /> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/updateprofile", element: <UpdateUserProfile /> },
    { path: "*", element: <PageNotFound /> },
  ];

  const user = useAuthState(auth);
  console.log(user)
  const element = useRoutes(
    user[0] === null
      ? [...commonRoutes, ...authRoutes]
      : [...commonRoutes, ...authRoutes, ...authenticatedRoutes]
  );

  return <Suspense>{element}</Suspense>;
};
