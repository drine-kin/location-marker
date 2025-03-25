import { lazy } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { fiveDecimal, formatDate } from "../../utils";

const Heading = lazy(() => import("../UI/Heading"));
const Paragraph = lazy(() => import("../UI/Paragraph"));
const Button = lazy(() => import("../UI/Button"));

const ActionLayout = ({ item, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-8">
            <MdEdit
                size={24}
                className="text-secondary cursor-pointer hover:scale-[1.1] transition-all hover:transition-all"
                onClick={() => {
                    navigate(`/location/${item.id}/edit`);
                }}
            />
            <MdDelete
                size={24}
                className="text-secondary cursor-pointer hover:scale-[1.1] transition-all hover:transition-all"
                onClick={() => onDelete(item.id)}
            />
        </div>
    );
};

export default function ListItem({ item, onDelete }) {
    const navigate = useNavigate();

    return (
        <article className="group border border-gray-200 rounded-md shadow-xs overflow-hidden mb-3 hover:bg-gray-100">
            <div className="flex flex-col lg:flex-row items-center">
                <Link
                    to={`/location/${item.id}`}
                    className="w-full lg:w-auto lg:aspect-3/2 h-[245px]"
                >
                    <div className="relative h-full">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="group-hover:absolute inset-0 bg-black/20" />
                    </div>
                </Link>
                <div className="w-full grow p-6 lg:p-8 space-y-2">
                    <div className="flex justify-between">
                        <div className="flex flex-col space-y-2">
                            <Link to={`/location/${item.id}`}>
                                <Heading
                                    title={item.name}
                                    customClass="line-clamp-1"
                                />
                            </Link>
                            <div className="flex items-center space-x-2">
                                <div className="flex flex-col">
                                    <IoLocationOutline
                                        className="text-gray-500"
                                        size={20}
                                    />
                                </div>
                                <Paragraph
                                    content={`${
                                        item.latitude
                                            ? fiveDecimal(item.latitude)
                                            : 0
                                    }, ${
                                        item.longitude
                                            ? fiveDecimal(item.longitude)
                                            : 0
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <ActionLayout item={item} onDelete={onDelete} />
                        </div>
                    </div>
                    <Paragraph
                        content={item.description}
                        customClass="line-clamp-1"
                    />
                    <hr className="h-px my-4 bg-gray-200 border-0" />
                    <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
                        <Paragraph
                            content={`Last updated: ${formatDate(
                                item.updatedAt
                            )}`}
                        />
                        <div className="flex items-center justify-between py-1 lg:py-0">
                            <Button
                                label="View on Map"
                                icon={<GrMapLocation />}
                                onClick={() =>
                                    navigate(`/map-view`, {
                                        state: {
                                            lat: item.latitude,
                                            lng: item.longitude,
                                        },
                                    })
                                }
                            />
                            <div className="block lg:hidden order-1">
                                <ActionLayout item={item} onDelete={onDelete} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
