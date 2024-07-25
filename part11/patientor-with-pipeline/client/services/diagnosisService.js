import axios from "axios";
import { apiBaseUrl } from "../constants";
export const getAll = async () => {
    const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
    return data;
};
export const getByCode = async (code) => {
    const { data } = await axios.get(`${apiBaseUrl}/diagnoses/${code}`);
    return data;
};
export default {
    getAll,
    getByCode
};
