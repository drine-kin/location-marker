import { lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationSchema } from "../../validations/locationSchema";
import { fileToBase64 } from "../../utils";

const Heading = lazy(() => import("../UI/Heading"));
const Paragraph = lazy(() => import("../UI/Paragraph"));
const TextInput = lazy(() => import("./TextInput"));
const FileInput = lazy(() => import("./FileInput"));
const Button = lazy(() => import("../UI/Button"));
const ChooseLocation = lazy(() => import("../Location/ChooseLocation"));

export default function LocationForm({ initialValues, onSubmit }) {
    const [image, setImage] = useState(initialValues?.image || "");
    const isCreate = Object.values(initialValues).every(
        (value) => value === null
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(locationSchema),
        defaultValues: initialValues,
    });

    useEffect(() => {
        if (!isCreate) {
            reset(initialValues);
            setImage(initialValues.image || "");
        }
    }, [initialValues, isCreate, reset]);

    const handleMapChange = (lat, lng) => {
        setValue("latitude", lat);
        setValue("longitude", lng);
    };

    const handleFileChange = async (e) => {
        if (e.target.files?.length > 0) {
            const base64Image = await fileToBase64(e.target.files[0]);
            setImage(base64Image);
        }
    };

    const handleFileClick = () => {
        setImage(null);
        setValue("image", null);
    };

    const position = {
        lat: 51.505,
        lng: -0.09,
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <TextInput
                    label="Name"
                    placeholder="Enter location name"
                    {...register("name")}
                />
                {errors.name && (
                    <Paragraph
                        content={errors.name.message}
                        customClass="text-red-500"
                    />
                )}
            </div>

            <div>
                <TextInput
                    label="Description"
                    placeholder="Enter description"
                    {...register("description")}
                />
                {errors.description && (
                    <Paragraph
                        content={errors.description.message}
                        customClass="text-red-500"
                    />
                )}
            </div>

            <div>
                <FileInput
                    label="Image"
                    {...register("image")}
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    onChange={handleFileChange}
                    onClick={handleFileClick}
                />
                {errors.image && (
                    <Paragraph
                        content={errors.image.message}
                        customClass="text-red-500"
                    />
                )}
            </div>

            {image ? (
                <div className="space-y-2">
                    <Heading
                        title="Image Preview"
                        customClass="text-lg text-gray-500 font-normal"
                    />
                    <img
                        src={image}
                        alt={"Location Image"}
                        className="w-auto h-48"
                    />
                </div>
            ) : null}

            <div>
                <ChooseLocation
                    position={position}
                    onChange={handleMapChange}
                />
                {errors.latitude && (
                    <Paragraph
                        content="Please select location"
                        customClass="text-red-500 pt-2"
                    />
                )}
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="w-full lg:w-1/2">
                    <TextInput
                        label="Latitude"
                        placeholder="Latitude"
                        {...register("latitude")}
                        disabled
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <TextInput
                        label="Longitude"
                        placeholder="Longitude"
                        {...register("longitude")}
                        disabled
                    />
                </div>
            </div>

            <div className="flex justify-center lg:justify-end">
                <Button
                    label={isCreate ? "Save Location" : "Update Location"}
                    customClass="px-6 py-4 w-full lg:w-auto"
                    type="submit"
                />
            </div>
        </form>
    );
}
