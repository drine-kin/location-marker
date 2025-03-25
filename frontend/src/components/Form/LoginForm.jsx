import { lazy } from "react";

const GoogleLoginButton = lazy(() => import("../UI/GoogleLoginButton"));

export default function LoginForm() {
    return (
        <div className="bg-white sm:bg-gray-200 h-screen">
            <div className="flex justify-center items-center w-full h-full">
                <form
                    className="lg:w-[400px] h-52 max-w-full bg-white rounded-sm p-8 space-y-10 flex justify-center items-center"
                >
                    <GoogleLoginButton />
                </form>
            </div>
        </div>
    );
}
