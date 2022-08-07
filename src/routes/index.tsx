import { useRoutes } from "react-router-dom"
import { Home } from "src/features/misc/home/routes/Home";
import { publicRoutes } from "./public"

export const AppRoutes = () => {
    const commonRoutes = [{path: '/', element: <Home/>}];

    const routes = publicRoutes

    const element = useRoutes([...commonRoutes, ...routes])

    return <>{element}</>
}