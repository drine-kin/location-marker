import { lazy, useMemo, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const Heading = lazy(() => import("../UI/Heading"));

function DraggableMarker({ position, onChange }) {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const position = marker.getLatLng();
                    onChange(position.lat, position.lng);
                }
            },
        }),
        [onChange]
    );

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        />
    );
}

export default function ChooseLocation({ position, onChange }) {
    return (
        <div className="flex flex-col space-y-2">
            <Heading
                title="Map Location"
                customClass="text-lg text-gray-500 font-normal"
            />
            <MapContainer
                center={position}
                zoom={15}
                className="w-full h-[50vh]"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker position={position} onChange={onChange} />
            </MapContainer>
        </div>
    );
}
