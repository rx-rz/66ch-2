import { useRoutes } from "react-router-dom";
import { Home } from "src/features/home/routes/Home";
import PostContent from "src/features/posts/components/CreatePost/PostContent";
import PostSettings from "src/features/posts/components/CreatePost/PostSettings";
import PostDetails from "src/features/posts/components/PostDetails/PostDetails";
import Postlist from "src/features/posts/components/PostList/Postlist";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/createpost", element: <PostContent /> },
    { path: "/postsettings", element: <PostSettings /> },
    { path: "/postlist", element: <Postlist /> },
    {path: "/post/:id", element: <PostDetails/>}
  ];

  const routes = publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  return <>{element}</>;
};
