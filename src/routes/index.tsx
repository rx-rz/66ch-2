import { useRoutes } from "react-router-dom"
import { Home } from "src/features/home/routes/Home";
import PostDetails from "src/features/posts/components/CreatePost/PostDetails";
import { publicRoutes } from "./public"

export const AppRoutes = () => {
    const commonRoutes = [{path: '/', element: <Home/>}, {path: '/createpost', element: <PostDetails/>}];

    const routes = publicRoutes

    const element = useRoutes([...commonRoutes, ...routes])

    return <>{element}</>
}