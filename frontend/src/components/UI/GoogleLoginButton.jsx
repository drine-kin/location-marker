import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
    const navigate = useNavigate();
    const { addAuth } = useAuthStore();

    return (
        <GoogleLogin
            onSuccess={(res) => {
                const decoded = jwtDecode(res.credential);
                console.log("Google Login Success:", decoded);

                const data = {
                    email: decoded.email,
                    name: decoded.given_name,
                    picture: decoded.picture,
                    issuedAt: decoded.iat,
                    expiredAt: decoded.exp,
                };

                addAuth(data);

                navigate("/");
            }}
            onError={() => {
                console.log("Google Login Failed");
            }}
            useOneTap
            auto_select
        />
    );
}
