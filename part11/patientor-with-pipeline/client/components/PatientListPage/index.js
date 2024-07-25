import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";
import patientService from "../../services/patientService";
const PatientListPage = ({ patients, setPatients }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState();
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewPatient = async (values) => {
        try {
            const patient = await patientService.create(values);
            setPatients(patients.concat(patient));
            setModalOpen(false);
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                }
                else {
                    setError("Unrecognized axios error");
                }
            }
            else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };
    const handleSubmit = (values) => {
        submitNewPatient(values).catch((e) => {
            console.error("Unhandled promise rejection:", e);
        });
    };
    return (_jsxs("div", { className: "App", children: [_jsx(Box, { children: _jsx(Typography, { align: "center", variant: "h6", children: "Patient list" }) }), _jsxs(Table, { style: { marginBottom: "1em" }, children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Gender" }), _jsx(TableCell, { children: "Occupation" }), _jsx(TableCell, { children: "Health Rating" })] }) }), _jsx(TableBody, { children: Object.values(patients).map((patient) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Link, { to: `/api/patients/${patient.id}`, children: patient.name }) }), _jsx(TableCell, { children: patient.gender }), _jsx(TableCell, { children: patient.occupation }), _jsx(TableCell, { children: _jsx(HealthRatingBar, { showText: false, rating: 1 }) })] }, patient.id))) })] }), _jsx(AddPatientModal, { modalOpen: modalOpen, onSubmit: handleSubmit, error: error, onClose: closeModal }), _jsx(Button, { variant: "contained", onClick: () => openModal(), children: "Add New Patient" })] }));
};
export default PatientListPage;
