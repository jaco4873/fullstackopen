import { Entry, EntryWithoutId, Patient, NonSensitivePatient, PatientForm } from '../types';
declare const _default: {
    getPatients: () => Patient[];
    getPatientById: (id: string) => Patient | undefined;
    getNonSensitivePatientEntries: () => NonSensitivePatient[];
    addPatient: (entry: PatientForm) => Patient;
    addEntryToPatient: (patientId: string, entry: EntryWithoutId) => Entry;
};
export default _default;
