import { AuthRoutes } from "src/features/auth/routes";

export const authRoutes = [
    {
        path: '/auth/*',
        element: <AuthRoutes/>
    }
]