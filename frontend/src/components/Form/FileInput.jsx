import { lazy } from "react";

const Paragraph = lazy(() => import("../UI/Paragraph"))

export default function FileInput({ label, ...rest }) {
    return (
        <div className="flex flex-col space-y-2 mb-4">
            <label className="text-lg text-gray-500 ">{label}</label>
            <input type="file" className="w-full border border-gray-400 rounded-sm cursor-pointer file:cursor-pointer file:bg-secondary file:px-4 file:py-3 file:mr-4 file:text-white focus:outline-none" {...rest} />
            <Paragraph content="PNG, JPG or WEBP (3:2)" customClass="text-sm"/>
        </div>
    );
}