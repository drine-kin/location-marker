import { lazy } from "react";

const LoginForm = lazy(() => import("../components/Form/LoginForm"));

export default function Login() {
    return <LoginForm />;
}
