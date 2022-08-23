import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import PageNotFound from "src/features/404/PageNotFound";
import { useUserContext } from "src/context/userContext";
import { Register, Login } from "src/features";
import { AnimatePresence } from "framer-motion";

const Home = React.lazy(() => import("src/features/home"));
const PendingPosts = React.lazy(
  () => import("src/features/posts/routes/PendingPosts")
);

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
const UserOwnProfile = React.lazy(
  () => import("src/features/profile/routes/UserOwnProfile")
);
const UserProfile = React.lazy(
  () => import("src/features/profile/routes/UserProfile")
);

export const AppRoutes = () => {
  const { user } = useUserContext()!;
  const commonRoutes = [
    { path: "/auth/register", element: <Register /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/", element: <Home /> },
    { path: "/user/:id", element: <UserProfile /> },
    { path: "/postlist", element: <PostList /> },
    { path: "/post/:id", element: <PostContent /> },
    { path: "/post/:id/:status/:authorId", element: <PostContent /> },
    { path: "/search", element: <PostSearch /> },
    { path: "/search/:tag", element: <PostSearch /> },
    { path: "*", element: <PageNotFound /> },
  ];

  const adminRoutes = [{ path: "/pendingposts", element: <PendingPosts /> }];

  const authenticatedRoutes = [
    { path: "/createpost", element: <CreatePost /> },
    { path: "/createpost/:id", element: <CreatePost /> },
    { path: "/profile", element: <UserOwnProfile /> },
    { path: "/updateprofile", element: <UpdateProfile /> },
    { path: "*", element: <PageNotFound /> },
  ];

  const element = useRoutes(
    user === null
      ? [...commonRoutes]
      : user?.role === "admin"
      ? [...commonRoutes, ...authenticatedRoutes, ...adminRoutes]
      : [...commonRoutes, ...authenticatedRoutes]
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {" "}
      <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>
    </AnimatePresence>
  );
};
