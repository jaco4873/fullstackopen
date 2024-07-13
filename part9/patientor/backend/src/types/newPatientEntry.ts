import { PatientEntry } from './patientEntry';

export type NewPatientEntry = Omit<PatientEntry, 'id'>;