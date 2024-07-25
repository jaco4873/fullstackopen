import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { apiBaseUrl } from "../constants";
import patientService from "../services/patientService";
import PatientListPage from "./PatientListPage";
import PatientView from "./PatientView";
const App = () => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        void axios.get(`${apiBaseUrl}/ping`);
        const fetchPatientList = async () => {
            const patients = await patientService.getAll();
            setPatients(patients);
        };
        void fetchPatientList();
    }, []);
    return (_jsx("div", { className: "App", children: _jsx(Router, { children: _jsxs(Container, { children: [_jsx(Typography, { variant: "h3", style: { marginBottom: "0.5em" }, children: "Patientor" }), _jsx(Button, { component: Link, to: "/", variant: "contained", color: "primary", children: "Home" }), _jsx(Divider, { hidden: true }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(PatientListPage, { patients: patients, setPatients: setPatients }) }), _jsx(Route, { path: "/api/patients/:id", element: _jsx(PatientView, {}) })] })] }) }) }));
};
export default App;
