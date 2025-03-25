import { useState, lazy } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { menuLists } from "../../constants/menuLists";
import { cn } from "../../utils/index";
import { useAuthStore } from "../../store/useAuthStore";

const Button = lazy(() => import("../UI/Button"));
const Paragraph = lazy(() => import("../UI/Paragraph"));

export default function Navbar() {
    const [mobileNav, setMobileNav] = useState(false);
    const [isPop, setIsPop] = useState(false);

    const { auth, deleteAuth } = useAuthStore();

    const onCloseMobileNav = () => {
        setMobileNav(false);
        document.body.classList.remove("overflow-y-hidden");
    };

    const onPopClose = () => {
        setIsPop(false);
        document.body.classList.remove("overflow-y-hidden");
    };

    const onLogout = () => {
        setMobileNav(false);
        deleteAuth();
        onPopClose();
    };

    return (
        <nav className="py-4 bg-white border-b-[1px] border-b-gray-200 sticky top-0 z-[9999999]">
            <div className="container">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex gap-2 items-center">
                        <img
                            src="/logo-main.png"
                            alt="Logo"
                            className="w-10 h-10"
                        />
                    </Link>

                    <button
                        className="block lg:hidden"
                        onClick={() => {
                            setMobileNav(true);
                            document.body.classList.add("overflow-y-hidden");
                        }}
                    >
                        <HiOutlineMenu size={24} />
                    </button>

                    {/* For Desktop */}
                    <div className="hidden lg:flex items-center justify-between space-x-12">
                        <ul className="flex space-x-10">
                            {menuLists.map((m) => (
                                <NavLink
                                    to={m.link}
                                    key={m.label}
                                    className={({ isActive }) =>
                                        `${cn(
                                            {
                                                "text-secondary": isActive,
                                                "text-gray-400 hover:text-secondary":
                                                    !isActive,
                                            },
                                            "transition-all hover:transition-all"
                                        )}`
                                    }
                                >
                                    {m.label}
                                </NavLink>
                            ))}
                        </ul>
                        {auth ? (
                            <div className="relative">
                                <div
                                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                                    onClick={() => {
                                        setIsPop(true);
                                        document.body.classList.add(
                                            "overflow-y-hidden"
                                        );
                                    }}
                                >
                                    <img
                                        src={auth ? auth.picture : "/user.png"}
                                        alt="Profile"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                {isPop ? (
                                    <>
                                        <div
                                            className="fixed inset-0"
                                            onClick={onPopClose}
                                        />
                                        <div className="absolute top-full -right-8">
                                            <div
                                                className="mt-2 p-1.5 border border-gray-200 bg-white rounded-sm shadow-sm min-w-28 transition-all"
                                                onClick={onLogout}
                                            >
                                                <div className="flex justify-center items-center hover:transition-all hover:bg-gray-100 hover:cursor-pointer">
                                                    <IoLogOutOutline
                                                        size={20}
                                                        className="text-gray-500"
                                                    />
                                                    <Paragraph
                                                        content="Logout"
                                                        customClass="flex p-1 justify-center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        ) : null}
                    </div>

                    {/* For Mobile */}
                    <div
                        className={cn(
                            {
                                "translate-x-0": mobileNav,
                                "translate-x-full": !mobileNav,
                            },
                            "transition-all duration-400 fixed inset-0 bg-gray-200 p-6"
                        )}
                    >
                        <div className="relative h-full">
                            <Link to="/" className="flex gap-2 items-center">
                                <img
                                    src="/logo-main.png"
                                    alt="Logo"
                                    className="w-10 h-10"
                                />
                            </Link>
                            <div
                                className="absolute top-2.5 right-0"
                                onClick={onCloseMobileNav}
                            >
                                <IoMdClose size={24} />
                            </div>
                            <div className="h-full flex flex-col justify-center items-center py-10">
                                <ul className="flex flex-col gap-10">
                                    {menuLists.map((m) => (
                                        <NavLink
                                            to={m.link}
                                            key={m.label}
                                            className={({ isActive }) =>
                                                `${cn(
                                                    {
                                                        "text-secondary":
                                                            isActive,
                                                        "text-gray-400 hover:text-secondary":
                                                            !isActive,
                                                    },
                                                    "text-center transition-all hover:transition-all"
                                                )}`
                                            }
                                            onClick={onCloseMobileNav}
                                        >
                                            {m.label}
                                        </NavLink>
                                    ))}
                                </ul>
                                <div className="flex mt-auto">
                                    <Button
                                        label="Logout"
                                        icon={<IoLogOutOutline size={20} />}
                                        isOutline
                                        customClass="border-0"
                                        onClick={onLogout}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
