import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import PageNotFound from "src/features/404/PageNotFound";
import { useUserContext } from "src/context/userContext";
import { Register, Login } from "src/features";
import { AnimatePresence } from "framer-motion";
import { ColorRing } from "react-loader-spinner";

const Home = React.lazy(() => import("src/features/home"));
const PendingPosts = React.lazy(
  () => import("src/features/posts/routes/PendingPosts")
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
    { path: "/auth/register", element: <Register /> } /*done*/,
    { path: "/auth/login", element: <Login /> } /*done*/,
    { path: "/", element: <Home /> } /*done*/,
    { path: "/user/:id", element: <UserProfile /> },
    { path: "/post/:id", element: <PostContent /> },
    { path: "/post/:id/:status/:authorId", element: <PostContent /> },
    { path: "/search", element: <PostSearch /> },
    { path: "/search/:tag", element: <PostSearch /> },
    { path: "*", element: <PageNotFound /> },
  ];

  const authenticatedRoutes = [
    { path: "/createpost", element: <CreatePost /> },
    { path: "/createpost/:id", element: <CreatePost /> },
    { path: "/profile", element: <UserOwnProfile /> },
    { path: "/updateprofile", element: <UpdateProfile /> },
    { path: "*", element: <PageNotFound /> },
    { path: "/pendingposts", element: <PendingPosts /> },
  ];

  // check if the user is not null
  const element = useRoutes(
    user === null
      ? // if user is null, use the common routes
        [...commonRoutes]
      : // if user is not null, use the common routes and the authenticated routes
        [...commonRoutes, ...authenticatedRoutes]
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#000", "#000", "#000", "#000", "#000"]}
            />
          </div>
        }
      >
        {element}
      </Suspense>
    </AnimatePresence>
  );
};
