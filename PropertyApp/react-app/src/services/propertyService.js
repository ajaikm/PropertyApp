import axios from "axios";

const API_URL = "https://localhost:7174/api/properties";

export const getProperties = async () => {
    try
    {
        const response = await axios.get(API_URL);
        return response.data;

    } catch (error)
    {
        console.error("Error fetching properties:", error);
        throw error;
    }
};