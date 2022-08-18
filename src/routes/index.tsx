import React, { Suspense } from "react";
import { auth } from "src/utils/firebaseConfig";
import { authRoutes } from "./public";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRoutes } from "react-router-dom";
import PageNotFound from "src/features/404/PageNotFound";
const Home = React.lazy(() => import("src/features/home/routes/Home"));
const PostList = React.lazy(
  () => import("src/features/posts/components/PostList/Postlist")
);
const CreatePost = React.lazy(
  () => import("src/features/posts/routes/CreatePost")
);
const PostContent = React.lazy(
  () => import("src/features/posts/routes/PostContent")
);
const PostSearch = React.lazy(
  () => import("src/features/posts/routes/SearchPosts")
);
const UpdateProfile = React.lazy(
  () => import("src/features/profile/routes/UpdateUserProfile")
);
const UserProfile = React.lazy(
  () => import("src/features/profile/routes/UserProfile")
);

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/postlist", element: <PostList /> },
    { path: "/post/:id", element: <PostContent /> },
    { path: "/search", element: <PostSearch /> },
    { path: "/search/:tag", element: <PostSearch /> },
    { path: "*", element: <PageNotFound /> },
  ];

  const authenticatedRoutes = [
    { path: "/createpost", element: <CreatePost /> },
    { path: "/createpost/:id", element: <CreatePost /> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/updateprofile", element: <UpdateProfile /> },
    { path: "*", element: <PageNotFound /> },
  ];

  const user = useAuthState(auth);
  const element = useRoutes(
    user[0] === null
      ? [...commonRoutes, ...authRoutes]
      : [...commonRoutes, ...authRoutes, ...authenticatedRoutes]
  );

  return <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>;
};
