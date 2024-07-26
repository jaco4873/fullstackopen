import patientData from '../data/patients';
import { Entry, EntryWithoutId, Patient, NonSensitivePatient, PatientForm } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientData;
};

const getPatientById = (id: string): Patient | undefined => {
  return patientData.find(p => p.id === id);
};

const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
    }));
}; 

const addPatient = (
  entry: PatientForm
): Patient => {

  const newPatientEntry: Patient = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (patientId: string, entry: EntryWithoutId): Entry => {
  const newEntry: Entry = {
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