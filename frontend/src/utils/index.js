import moment from "moment/moment";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const formatDate = (date) => {
    return date ? moment(date).format("MMMM DD, YYYY") : "-";
};

export const fiveDecimal = (value) => {
    return parseFloat(value.toFixed(5));
};

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });
};

export const isTokenValid = (token) => {
    return token * 1000 > Date.now();
};
