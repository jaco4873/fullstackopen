"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getPatientById = (id) => {
    return patients_1.default.find(p => p.id === id);
};
const getNonSensitivePatientEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};
const addPatient = (entry) => {
    const newPatientEntry = {
        id: (0, uuid_1.v1)(),
        entries: [],
        ...entry
    };
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addEntryToPatient = (patientId, entry) => {
    const newEntry = {
        id: (0, uuid_1.v1)(),
        ...entry
    };
    const patient = patients_1.default.find(p => p.id === patientId);
    if (!patient) {
        throw new Error(`Patient with id ${patientId} not found`);
    }
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    getPatientById,
    getNonSensitivePatientEntries,
    addPatient,
    addEntryToPatient
};
