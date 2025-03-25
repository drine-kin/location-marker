import { lazy, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));

export default function RootLayout() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    return (
        <>
            <Navbar />
            <main className="container py-8">
                <Outlet />
            </main>
            <Footer />
            <Toaster position="right-bottom"/>
        </>
    );
}
