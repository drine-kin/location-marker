import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import "leaflet/dist/leaflet.css";

const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <StrictMode>
            <App />
        </StrictMode>
    </GoogleOAuthProvider>
);
