import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import { fileToBase64 } from "../utils";
import useLocationService from "../hooks/useLocationService";
import { initialValues } from "../constants/index";

const Heading = lazy(() => import("../components/UI/Heading"));
const LocationForm = lazy(() => import("../components/Form/LocationForm"));

export default function AddLocation() {
    const navigate = useNavigate();

    const { createLocation } = useLocationService();

    const handleSubmit = async (data) => {
        let image = null;
        if (data.image) {
            image = await fileToBase64(data.image[0]);
        }

        const newLocation = {
            ...data,
            image: image,
        };
        await createLocation(newLocation);
        navigate("/");
    };

    return (
        <section>
            <Heading title="Add Location" customClass="pb-5" />
            <LocationForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </section>
    );
}
