import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TextField, InputLabel, Select, MenuItem, Grid, Button } from '@mui/material';
import { Gender } from "../../../shared/types";
const genderOptions = Object.values(Gender).map(v => ({
    value: v, label: v.toString()
}));
const AddPatientForm = ({ onCancel, onSubmit }) => {
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [ssn, setSsn] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState(Gender.Other);
    const onGenderChange = (event) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            const value = event.target.value;
            const gender = Object.values(Gender).find(g => g.toString() === value);
            if (gender) {
                setGender(gender);
            }
        }
    };
    const addPatient = (event) => {
        event.preventDefault();
        onSubmit({
            name,
            occupation,
            ssn,
            dateOfBirth,
            gender
        });
    };
    return (_jsx("div", { children: _jsxs("form", { onSubmit: addPatient, children: [_jsx(TextField, { label: "Name", fullWidth: true, value: name, onChange: ({ target }) => setName(target.value) }), _jsx(TextField, { label: "Social security number", fullWidth: true, value: ssn, onChange: ({ target }) => setSsn(target.value) }), _jsx(TextField, { label: "Date of birth", placeholder: "YYYY-MM-DD", fullWidth: true, value: dateOfBirth, onChange: ({ target }) => setDateOfBirth(target.value) }), _jsx(TextField, { label: "Occupation", fullWidth: true, value: occupation, onChange: ({ target }) => setOccupation(target.value) }), _jsx(InputLabel, { style: { marginTop: 20 }, children: "Gender" }), _jsx(Select, { label: "Gender", fullWidth: true, value: gender, onChange: onGenderChange, children: genderOptions.map(option => _jsx(MenuItem, { value: option.value, children: option.label }, option.label)) }), _jsxs(Grid, { children: [_jsx(Grid, { item: true, children: _jsx(Button, { color: "secondary", variant: "contained", style: { float: "left" }, type: "button", onClick: onCancel, children: "Cancel" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { style: {
                                    float: "right",
                                }, type: "submit", variant: "contained", children: "Add" }) })] })] }) }));
};
export default AddPatientForm;
