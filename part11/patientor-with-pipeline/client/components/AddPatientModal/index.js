import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddPatientForm from "./AddPatientForm";
const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }) => (_jsxs(Dialog, { fullWidth: true, open: modalOpen, onClose: () => onClose(), children: [_jsx(DialogTitle, { children: "Add a new patient" }), _jsx(Divider, {}), _jsxs(DialogContent, { children: [error && _jsx(Alert, { severity: "error", children: error }), _jsx(AddPatientForm, { onSubmit: onSubmit, onCancel: onClose })] })] }));
export default AddPatientModal;
