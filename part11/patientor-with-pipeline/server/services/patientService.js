import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';
const getPatients = () => {
    return patientData;
};
const getPatientById = (id) => {
    return patientData.find(p => p.id === id);
};
const getNonSensitivePatientEntries = () => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};
const addPatient = (entry) => {
    const newPatientEntry = {
        id: uuid(),
        entries: [],
        ...entry
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
};
const addEntryToPatient = (patientId, entry) => {
    const newEntry = {
        id: uuid(),
        ...entry
    };
    const patient = patientData.find(p => p.id === patientId);
    if (!patient) {
        throw new Error(`Patient with id ${patientId} not found`);
    }
    patient.entries.push(newEntry);
    return newEntry;
};
export default {
    getPatients,
    getPatientById,
    getNonSensitivePatientEntries,
    addPatient,
    addEntryToPatient
};
