import { AuthLayout } from "src/components/Layout/Layout"
import { LoginForm } from "../components/LoginForm"

export const Login = () => {
    return (
        <AuthLayout title="Login">
            <LoginForm/>
        </AuthLayout>
    )
}