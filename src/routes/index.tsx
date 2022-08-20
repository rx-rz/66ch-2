import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import PageNotFound from "src/features/404/PageNotFound";
import { useUserContext } from "src/context/userContext";
import Register from "src/features/auth/routes/Register";
import Login from "src/features/auth/routes/Login";

const Home = React.lazy(() => import("src/features/home/routes/Home"));
const PendingPosts = React.lazy(
  () => import("src/features/posts/routes/PendingPosts")
);
// const Login = React.lazy(
//   () => import("src/features/auth/routes/Login")
// );

// const Register = React.lazy(
//   () => import("src/features/auth/routes/Register")
// );
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
  const { user } = useUserContext()!;
  const commonRoutes = [
    {path: "/auth/register", element: <Register/>},
    {path: "/auth/login", element: <Login/>},
    { path: "/", element: <Home /> },
    { path: "/postlist", element: <PostList /> },
    { path: "/post/:id", element: <PostContent /> },
    { path: "/post/:id/:status/:authorId", element: <PostContent /> },
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
  
  const adminRoutes = [{ path: "/pendingposts", element: <PendingPosts /> }];
  const element = useRoutes(
    user === null
      ? [...commonRoutes]
      : user?.role === "admin"
      ? [...commonRoutes, ...authenticatedRoutes, ...adminRoutes]
      : [...commonRoutes, ...authenticatedRoutes]
  );

  return <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>;
};
