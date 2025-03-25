import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../service/apiService";

const useLocationService = (pageNo = 1, limit = 5) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);

    const fetchAllLocations = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/locations`);
            return response.data
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const data = await api.get(
                `/locations?page=${pageNo}&limit=${limit}`
            );
            setLocations(data?.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, [limit, pageNo]);

    const getLocationById = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/locations/${id}`);
            return response.data;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const createLocation = async (data) => {
        setLoading(true);
        try {
            await api.post("/locations", data);
            toast.success("Location created successfully");
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateLocation = async (id, data) => {
        setLoading(true);
        try {
            await api.put(`/locations/${id}`, data);
            toast.success("Location updated successfully");
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteLocation = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/locations/${id}`);
            toast.success("Location deleted successfully");
            fetchLocations()
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        locations,
        fetchAllLocations,
        getLocationById,
        createLocation,
        updateLocation,
        deleteLocation,
        loading,
        error,
    };
};

export default useLocationService;
