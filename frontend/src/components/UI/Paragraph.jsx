import { cn } from "../../utils";

export default function Paragraph({ content, customClass }) {
    return (
        <p className={cn('text-gray-500 font-normal', customClass)}>
            {content}
        </p>
    )
}