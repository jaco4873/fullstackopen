import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid, OutlinedInput, Checkbox, ListItemText, } from '@mui/material';
import { getAll } from '../../services/diagnosisService';
import { createEntry } from '../../services/patientService';
import { EntryType, HealthCheckRating } from '../../../shared/types';
const EntryForm = ({ patientId, onEntryAdded }) => {
    const [type, setType] = useState(EntryType.HealthCheck);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState([]);
    const [specialist, setSpecialist] = useState('');
    const [allDiagnosisCodes, setAllDiagnosisCodes] = useState([]);
    useEffect(() => {
        const fetchDiagnosisCodes = async () => {
            const diagnoses = await getAll();
            setAllDiagnosisCodes(diagnoses);
        };
        void fetchDiagnosisCodes();
    }, []);
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };
    const handleDiagnosisCodesChange = (event) => {
        setDiagnosisCodes(event.target.value);
    };
    const handleHealthCheckRating = (e) => {
        setHealthCheckRating(e.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        submitNewPatient(event).catch((e) => {
            console.error("Unhandled promise rejection:", e);
        });
    };
    const submitNewPatient = async (event) => {
        event.preventDefault();
        try {
            switch (type) {
                case EntryType.HealthCheck: {
                    const newEntry = {
                        type: 'HealthCheck',
                        date,
                        description,
                        specialist,
                        diagnosisCodes,
                        healthCheckRating
                    };
                    await createEntry(patientId, newEntry);
                    break;
                }
                case EntryType.OccupationalHealthcare: {
                    const newEntry = {
                        type: 'OccupationalHealthcare',
                        date,
                        description,
                        specialist,
                        diagnosisCodes,
                        employerName,
                        sickLeave: sickLeaveStartDate && sickLeaveEndDate ? {
                            startDate: sickLeaveStartDate,
                            endDate: sickLeaveEndDate
                        } : undefined
                    };
                    await createEntry(patientId, newEntry);
                    break;
                }
                case EntryType.Hospital: {
                    const newEntry = {
                        type: 'Hospital',
                        date,
                        description,
                        specialist,
                        diagnosisCodes,
                        discharge: {
                            date: dischargeDate,
                            criteria: dischargeCriteria
                        }
                    };
                    await createEntry(patientId, newEntry);
                    break;
                }
                default:
                    throw new Error(`Unsupported entry type: ${type}`);
            }
            onEntryAdded();
            setDate('');
            setDescription('');
            setSpecialist('');
            setDiagnosisCodes([]);
        }
        catch (e) {
            console.error('Failed to create entry', e);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("br", {}), _jsx("h2", { children: " Add New Entry " }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, label: "Date", type: "date", fullWidth: true, value: date, onChange: (e) => setDate(e.target.value), InputLabelProps: { shrink: true } }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { required: true, children: "Type" }), _jsxs(Select, { value: type, onChange: handleTypeChange, children: [_jsx(MenuItem, { value: "HealthCheck", children: "Health Check" }), _jsx(MenuItem, { value: "Hospital", children: "Hospital" }), _jsx(MenuItem, { value: "OccupationalHealthcare", children: "Occupational Healthcare" })] })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, label: "Description", fullWidth: true, value: description, onChange: (e) => setDescription(e.target.value) }) }), type === EntryType.HealthCheck && (_jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { required: true, children: "Health Check Rating" }), _jsxs(Select, { value: healthCheckRating, onChange: handleHealthCheckRating, children: [_jsx(MenuItem, { value: HealthCheckRating.Healthy, children: "Healthy" }), _jsx(MenuItem, { value: HealthCheckRating.LowRisk, children: "Low Risk" }), _jsx(MenuItem, { value: HealthCheckRating.HighRisk, children: "High Risk" }), _jsx(MenuItem, { value: HealthCheckRating.CriticalRisk, children: "Critical Risk" })] })] }) })), type === EntryType.OccupationalHealthcare && (_jsxs(_Fragment, { children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, label: "Employer Name", fullWidth: true, value: employerName, onChange: (e) => setEmployerName(e.target.value) }) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(TextField, { label: "Sick Leave Start Date", type: "date", InputLabelProps: { shrink: true }, fullWidth: true, value: sickLeaveStartDate, onChange: (e) => setSickLeaveStartDate(e.target.value) }) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(TextField, { label: "Sick Leave End Date", type: "date", InputLabelProps: { shrink: true }, fullWidth: true, value: sickLeaveEndDate, onChange: (e) => setSickLeaveEndDate(e.target.value) }) })] })), type === EntryType.Hospital && (_jsxs(_Fragment, { children: [_jsx(Grid, { item: true, xs: 6, children: _jsx(TextField, { required: true, label: "Discharge Date", type: "date", InputLabelProps: { shrink: true }, fullWidth: true, value: dischargeDate, onChange: (e) => setDischargeDate(e.target.value) }) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(TextField, { required: true, label: "Discharge Criteria", fullWidth: true, value: dischargeCriteria, onChange: (e) => setDischargeCriteria(e.target.value) }) })] })), _jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Diagnosis Codes" }), _jsx(Select, { multiple: true, value: diagnosisCodes, onChange: handleDiagnosisCodesChange, input: _jsx(OutlinedInput, { label: "Diagnosis Codes" }), renderValue: (selected) => selected.join(', '), MenuProps: { PaperProps: { style: { maxHeight: 150 } } }, children: allDiagnosisCodes.map((diagnosis) => (_jsxs(MenuItem, { value: diagnosis.code, children: [_jsx(Checkbox, { checked: diagnosisCodes.indexOf(diagnosis.code) > -1 }), _jsx(ListItemText, { primary: diagnosis.code })] }, diagnosis.code))) })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, label: "Specialist", fullWidth: true, value: specialist, onChange: (e) => setSpecialist(e.target.value) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, children: "Add Entry" }) })] })] }));
};
export default EntryForm;
