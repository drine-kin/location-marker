import { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fileToBase64 } from "../utils";
import useLocationService from "../hooks/useLocationService";
import { initialValues } from "../constants/index";

const Heading = lazy(() => import("../components/UI/Heading"));
const LocationForm = lazy(() => import("../components/Form/LocationForm"));

export default function EditLocation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);

    const { getLocationById, updateLocation } = useLocationService();

    useEffect(() => {
        (async () => {
            if (id) {
                const data = await getLocationById(id);
                setValues({
                    name: data.name,
                    description: data.description,
                    image: data.image,
                    latitude: data.latitude,
                    longitude: data.longitude,
                });
            }
        })();
    }, [id]);

    const handleSubmit = async (data) => {
        let image = null;
        if (typeof data.image !== "string") {
            image = await fileToBase64(data.image[0]);
        } else {
            image = data.image;
        }

        const newLocation = {
            ...data,
            image: image,
        };

        await updateLocation(id, newLocation);
        navigate("/");
    };

    return (
        <section>
            <Heading title="Edit Location" customClass="pb-5" />
            <LocationForm initialValues={values} onSubmit={handleSubmit} />
        </section>
    );
}
