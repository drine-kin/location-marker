export default function TextInput({
    label,
    placeholder,
    type = "text",
    ...rest
}) {
    return (
        <div className="flex flex-col space-y-2 mb-2">
            <label className="text-lg text-gray-500">{label}</label>
            <input type={type} placeholder={placeholder} maxLength={120} className="border border-gray-400 px-4 py-3 rounded-sm focus:outline-none disabled:bg-gray-100" {...rest} />
        </div>
    );
}
