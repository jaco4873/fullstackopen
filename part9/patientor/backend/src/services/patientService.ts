import patientData from '../../data/patients.ts';
import { Entry, EntryWithoutId, PatientEntry, NonSensitivePatientEntry, PatientFormValues } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
  return patientData;
};

const getPatientById = (id: string): PatientEntry | undefined => {
  return patientData.find(p => p.id === id);
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
    }));
}; 

const addPatient = (
  entry: PatientFormValues
): PatientEntry => {

  const newPatientEntry: PatientEntry = {
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