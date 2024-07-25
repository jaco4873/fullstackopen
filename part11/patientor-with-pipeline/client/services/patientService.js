import axios from "axios";
import { apiBaseUrl } from "../constants";
const getAll = async () => {
    const { data } = await axios.get(`${apiBaseUrl}/patients`);
    return data;
};
export const getById = async (id) => {
    const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
    return data;
};
const create = async (object) => {
    const { data } = await axios.post(`${apiBaseUrl}/patients`, object);
    return data;
};
export const createEntry = async (patientId, object) => {
    const { data } = await axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, object);
    return data;
};
export default {
    getAll, getById, create, createEntry
};
