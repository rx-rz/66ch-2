import { useRoutes } from "react-router-dom";
import { Home } from "src/features/home/routes/Home";
import Postlist from "src/features/posts/components/PostList/Postlist";
import CreatePost from "src/features/posts/routes/CreatePost";
import { PostContent } from "src/features/posts/routes/PostContent";
import { PostSearch } from "src/features/posts/routes/SearchPosts";

import { UpdateUserProfile } from "src/features/profile/routes/UpdateUserProfile";
import { UserProfile } from "src/features/profile/routes/UserProfile";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/createpost", element: <CreatePost/> },
    { path: "/postlist", element: <Postlist /> },
    {path: "/post/:id", element: <PostContent/>},
    {path: "/profile", element: <UserProfile/>},
    {path: "/updateprofile", element: <UpdateUserProfile/>},
    {path: "/search", element: <PostSearch/>}
    
  ];

  const routes = publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  return <>{element}</>;
};
