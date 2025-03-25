import Paragraph from "../UI/Paragraph";

export default function Footer() {
    return (
        <footer className="w-full border-t border-t-gray-200 mt-8 py-5">
            <div className="container">
                <Paragraph content={`© ${new Date().getFullYear()} Location Marker. All rights reserved.`} customClass="text-center"/>
            </div>
        </footer>
    );
}
