import { AuthLayout } from "src/components/Layout/Layout"
import { RegisterForm } from "../components/RegisterForm"

export const Register = () => {
    return (
        <AuthLayout title="Register">
            <RegisterForm/>
        </AuthLayout>
    )
}