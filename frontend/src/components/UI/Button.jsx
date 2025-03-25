import { cn } from "../../utils";

export default function Button({
    label,
    icon,
    customClass,
    onClick,
    isOutline = false,
    isDelete = false,
    ...rest
}) {
    return (
        <button
            className={cn(
                {
                    "border border-secondary hover:bg-secondary hover:text-white":
                        isOutline,
                    "bg-red-500 text-white": isDelete,
                    "bg-secondary text-white": !isOutline && !isDelete,
                },
                `min-w-28 hover:scale-[1.05] transition-all hover:transition-all px-4 py-3 flex items-center justify-center space-x-2 rounded-sm cursor-pointer ${
                    customClass ? customClass : ""
                }`
            )}
            onClick={onClick}
            {...rest}
        >
            {icon && icon}
            <span>{label}</span>
        </button>
    );
}
