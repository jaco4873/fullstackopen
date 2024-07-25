import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
const assertNever = (value) => {
    throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};
// Type Guards
const isHealthCheckEntry = (entry) => entry.type === 'HealthCheck';
const isHospitalEntry = (entry) => entry.type === 'Hospital';
const isOccupationalHealthcareEntry = (entry) => entry.type === 'OccupationalHealthcare';
const EntryDetails = ({ entries, diagnosisDescriptions }) => {
    const renderEntryDetails = (entry) => {
        switch (entry.type) {
            case 'HealthCheck':
                if (isHealthCheckEntry(entry)) {
                    return (_jsx("div", { children: _jsxs("p", { children: ["Health Check Rating: ", entry.healthCheckRating] }) }));
                }
                else {
                    return assertNever(entry);
                }
            case 'Hospital':
                if (isHospitalEntry(entry)) {
                    return (_jsxs("div", { children: [_jsxs("p", { children: ["Discharge Date: ", entry.discharge.date] }), _jsxs("p", { children: ["Discharge Criteria: ", entry.discharge.criteria] })] }));
                }
                else {
                    return assertNever(entry);
                }
            case 'OccupationalHealthcare':
                if (isOccupationalHealthcareEntry(entry)) {
                    return (_jsxs("div", { children: [_jsxs("p", { children: ["Employer Name: ", entry.employerName] }), entry.sickLeave && (_jsxs("p", { children: ["Sick Leave: ", entry.sickLeave.startDate, " - ", entry.sickLeave.endDate] }))] }));
                }
                else {
                    return assertNever(entry);
                }
            default:
                return assertNever(entry);
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Entries" }), _jsx(Table, { children: _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx("strong", { children: "Date" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Type" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Other Details" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Description" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Diagnosis Codes" }) }), _jsx(TableCell, { children: _jsx("strong", { children: "Specialist" }) })] }), entries.map((entry) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: entry.date }), _jsx(TableCell, { children: entry.type }), _jsx(TableCell, { children: renderEntryDetails(entry) }), _jsx(TableCell, { children: entry.description }), _jsx(TableCell, { children: entry.diagnosisCodes?.map((code) => (_jsxs("div", { children: [code, " - ", diagnosisDescriptions[code] || 'No descriptions exist...'] }, code))) }), _jsx(TableCell, { children: entry.specialist })] }, entry.id)))] }) })] }));
};
export default EntryDetails;
