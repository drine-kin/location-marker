import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "./store/useAuthStore";

const Login = lazy(() => import("./pages/Login"));
const RootLayout = lazy(() => import("./components/Layout/RootLayout"));
const AllLocations = lazy(() => import("./pages/AllLocations"));
const MapView = lazy(() => import("./pages/MapView"));
const AddLocation = lazy(() => import("./pages/AddLocation"));
const DetailLocation = lazy(() => import("./pages/DetailLocation"));
const EditLocation = lazy(() => import("./pages/EditLocation"));
const ProtectedRoutes = lazy(() => import("./components/Layout/ProtectedRoutes"));

export default function App() {
    const { auth } = useAuthStore();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        auth ? (
                            <Navigate to="/" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                            <RootLayout />
                        </ProtectedRoutes>
                    }
                >
                    <Route
                        index
                        element={<AllLocations />}
                    />
                    <Route path="map-view" element={<MapView />} />
                    <Route path="add-location" element={<AddLocation />} />
                    <Route path="location">
                        <Route path=":id" element={<DetailLocation />} />
                        <Route path=":id/edit" element={<EditLocation />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
