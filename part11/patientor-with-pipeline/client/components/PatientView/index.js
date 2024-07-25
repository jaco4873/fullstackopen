import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../../services/patientService';
import { getByCode } from '../../services/diagnosisService';
import EntryDetails from './EntryDetails';
import EntryForm from './EntryForm';
const PatientView = () => {
    const { id = '' } = useParams();
    const [patient, setPatient] = useState(null);
    const [diagnosisDescriptions, setDiagnosisDescriptions] = useState({});
    const [refetchTrigger, setRefetchTrigger] = useState(false);
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const data = await getById(id);
                setPatient(data);
                const diagnosisCodes = Array.from(data.entries.flatMap(entry => entry.diagnosisCodes || []));
                const descriptions = await Promise.all(diagnosisCodes.map(async (code) => {
                    const diagnosis = await getByCode(code);
                    return { [code]: diagnosis.name };
                }));
                setDiagnosisDescriptions(descriptions.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
            }
            catch (e) {
                console.error('Failed to fetch patient data:', e);
            }
        };
        void fetchPatient();
    }, [id, refetchTrigger]);
    if (!patient) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { children: [_jsx("br", {}), _jsxs("h1", { children: ["Patient: ", patient.name] }), _jsx(Table, { children: _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, { children: "Occupation" }), _jsx(TableCell, { children: patient.occupation })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Gender" }), _jsx(TableCell, { children: patient.gender })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { children: "SSN" }), _jsx(TableCell, { children: patient.ssn })] })] }) }), _jsx(EntryDetails, { entries: patient.entries, diagnosisDescriptions: diagnosisDescriptions }), _jsx(EntryForm, { patientId: id, onEntryAdded: () => setRefetchTrigger(!refetchTrigger) })] }));
};
export default PatientView;
