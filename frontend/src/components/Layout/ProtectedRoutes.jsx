import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { isTokenValid } from "../../utils";

export default function ProtectedRoutes({ children }) {
    const { auth } = useAuthStore();

    const token = isTokenValid(auth?.expiredAt || 0)

    return auth && token ? children : <Navigate to="/login" replace />;
}
