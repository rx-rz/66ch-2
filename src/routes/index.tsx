import { useRoutes } from "react-router-dom"
import HomePage from "src/features/misc/HomePage"
import { publicRoutes } from "./public"

export const AppRoutes = () => {
    const commonRoutes = [{path: '/', element: <HomePage/>}];

    const routes = publicRoutes

    const element = useRoutes([...commonRoutes, ...routes])

    return <>{element}</>
}