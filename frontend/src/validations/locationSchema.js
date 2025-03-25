import { z } from "zod";

const MAX_FILE_SIZE = 3145728;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const imageSchema = z.union([
    // Validate file object
    z
        .any()
        .refine((files) => files?.length === 1, "Image is required.")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            "Max file size is 3MB."
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png, and .webp files are accepted."
        ),
    // Validate Base64 string
    z.string().refine((value) => {
        // Check if the string is a valid Base64 image
        return /^data:image\/(jpeg|jpg|png|webp);base64,/.test(value);
    }, "Invalid Base64 image string."),
]);

export const locationSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    image: imageSchema,
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
});

