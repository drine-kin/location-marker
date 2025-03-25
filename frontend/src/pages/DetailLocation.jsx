import { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoLocationOutline, IoCalendarClearOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { formatDate } from "../utils";
import useLocationService from "../hooks/useLocationService";

const Heading = lazy(() => import("../components/UI/Heading"));
const Button = lazy(() => import("../components/UI/Button"));
const Paragraph = lazy(() => import("../components/UI/Paragraph"));

const TitleWithIcon = ({ icon, title }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="text-secondary text-2xl">{icon}</div>
            <Heading title={title} customClass="text-xl" />
        </div>
    );
};

const LabelValueLayout = ({ label, value }) => {
    return (
        <div>
            <Paragraph content={label} />
            <Paragraph content={value} customClass="font-medium" />
        </div>
    );
};

export default function DetailLocation() {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();
    const { getLocationById } = useLocationService();

    useEffect(() => {
        (async () => {
            if (id) {
                const data = await getLocationById(id);
                setLocation(data);
            }
        })();
    }, [id]);

    return (
        <section className="flex flex-col gap-4 min-h-[calc(100vh-230px)]">
            <Heading title={location?.name} customClass="pb-5" />
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-1/2 space-y-4">
                    <div className="w-full lg:h-[460px] aspect-3/2">
                        <img
                            src={location?.image}
                            alt={location?.name}
                            className="rounded-md w-full h-full object-cover object-center"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-5">
                    <Paragraph content={location?.description} />
                    <TitleWithIcon
                        icon={<IoLocationOutline />}
                        title="Coordinates"
                    />
                    <div className="flex flex-col space-y-5">
                        <LabelValueLayout
                            label="Latitude"
                            value={location?.latitude}
                        />
                        <LabelValueLayout
                            label="Longitude"
                            value={location?.longitude}
                        />
                    </div>
                    <TitleWithIcon
                        icon={<IoCalendarClearOutline />}
                        title="Location Details"
                    />
                    <div className="flex flex-col space-y-5">
                        <LabelValueLayout
                            label="Created"
                            value={formatDate(location?.createdAt)}
                        />
                        <LabelValueLayout
                            label="Last Updated"
                            value={formatDate(location?.updatedAt)}
                        />
                    </div>

                    <Button
                        label="View on Map"
                        icon={<GrMapLocation />}
                        onClick={() =>
                            navigate(`/map-view`, {
                                state: {
                                    lat: location?.latitude,
                                    lng: location?.longitude,
                                },
                            })
                        }
                        customClass="w-full"
                    />
                </div>
            </div>
        </section>
    );
}
