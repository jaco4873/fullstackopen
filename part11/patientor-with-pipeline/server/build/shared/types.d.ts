export declare enum EntryType {
    HealthCheck = "HealthCheck",
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare"
}
export declare enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}
export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}
export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}
export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type EntryForm = UnionOmit<Entry, 'id'>;
export declare enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
}
export type NewPatient = Omit<Patient, 'id'>;
export type PatientForm = Omit<Patient, "id" | "entries">;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export {};
