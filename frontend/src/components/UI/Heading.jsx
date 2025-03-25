import { cn } from "../../utils";

export default function Heading({ title, customClass }) {
    return (
        <h2 className={cn('text-gray-700 text-3xl font-semibold', customClass)}>
            {title}
        </h2>
    )
}