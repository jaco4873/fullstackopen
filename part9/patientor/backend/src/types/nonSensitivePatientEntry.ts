import  { PatientEntry } from './patientEntry';

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;