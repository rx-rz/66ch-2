import { AuthLayout } from "src/components/Layout/Layout"
import { LoginForm } from "../components/LoginForm"

export default function Login (){
    return (
        <AuthLayout title="Login">
            <LoginForm/>
        </AuthLayout>
    )
}