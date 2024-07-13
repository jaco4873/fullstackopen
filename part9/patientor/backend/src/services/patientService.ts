import patientData from '../../data/patients.ts';
import { v1 as uuid } from 'uuid';

import { PatientEntry } from '../types/patientEntry.ts';
import { NonSensitivePatientEntry } from '../types/nonSensitivePatientEntry.ts';
import { NewPatientEntry } from '../types/newPatientEntry.ts';

const getPatients = (): PatientEntry[] => {
  return patientData;
}; 

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
    }));
}; 

const addPatient = (
  entry: NewPatientEntry
): PatientEntry => {

  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
};