import { lazy, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useLocationService from "../hooks/useLocationService";

const Heading = lazy(() => import("../components/UI/Heading"));
const Paragraph = lazy(() => import("../components/UI/Paragraph"));

const MapViewPopup = ({ locations, idx }) => {
    const navigate = useNavigate();

    return (
        <Popup minWidth={160} closeButton={false}>
            <div className="flex flex-col gap-1">
                <img
                    src={locations[idx].image}
                    alt={locations[idx].name}
                    className="w-full h-wfull object-cover"
                />
                <div className="flex flex-col space-y-1 p-1">
                    <div className="flex justify-between items-center">
                        <Heading
                            title={locations[idx].name}
                            customClass="text-sm"
                        />
                        <MdEdit
                            size={16}
                            className="cursor-pointer"
                            onClick={() => {
                                navigate(`/location/${locations[idx].id}/edit`);
                            }}
                        />
                    </div>
                    <Paragraph
                        content={locations[idx].description}
                        customClass="text-xs !m-0"
                    />
                </div>
            </div>
        </Popup>
    );
};

export default function MapView() {
    const { state } = useLocation();
    const [allLocations, setAllLocations] = useState([]);
    const [locationsArr, setLocationsArr] = useState([]);
    const { fetchAllLocations } = useLocationService();

    useEffect(() => {
        (async () => {
            const data = await fetchAllLocations();
            setAllLocations(data.list);
            setLocationsArr(
                data.list?.map((location) => [
                    location.latitude,
                    location.longitude,
                ])
            );
        })();
    }, []);

    const position = {
        lat: 51.505,
        lng: -0.09,
    };

    return (
        <div className="-mx-8 lg:-mx-16 -my-8">
            <MapContainer
                center={state ? state : position}
                zoom={state ? 17 : 13}
                className="w-full h-[calc(100vh-65px)]"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {locationsArr.map((location, idx) => (
                    <Marker
                        key={idx}
                        position={location}
                        icon={
                            new Icon({
                                iconUrl: "/marker-icon.png",
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                            })
                        }
                    >
                        <MapViewPopup locations={allLocations} idx={idx} />
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
