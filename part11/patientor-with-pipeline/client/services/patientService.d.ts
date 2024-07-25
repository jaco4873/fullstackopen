import { Patient, PatientFormValues, Entry, EntryFormValues } from "../types";
export declare const getById: (id: string) => Promise<Patient>;
export declare const createEntry: (patientId: string, object: EntryFormValues) => Promise<Entry>;
declare const _default: {
    getAll: () => Promise<Patient[]>;
    getById: (id: string) => Promise<Patient>;
    create: (object: PatientFormValues) => Promise<Patient>;
    createEntry: (patientId: string, object: EntryFormValues) => Promise<Entry>;
};
export default _default;
