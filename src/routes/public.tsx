import { AuthRoutes } from "src/features/auth/routes";

export const publicRoutes = [
    {
        path: '/auth/*',
        element: <AuthRoutes/>
    }
]