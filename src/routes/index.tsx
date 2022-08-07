import { useRoutes } from "react-router-dom";
import { Home } from "src/features/home/routes/Home";
import PostDetails from "src/features/posts/components/PostDetails/PostDetails";
import Postlist from "src/features/posts/components/PostList/Postlist";
import CreatePost from "src/features/posts/routes/CreatePost";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/createpost", element: <CreatePost/> },
    { path: "/postlist", element: <Postlist /> },
    {path: "/post/:id", element: <PostDetails/>}
  ];

  const routes = publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  return <>{element}</>;
};
