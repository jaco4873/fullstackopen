"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewPatientEntry_1 = __importDefault(require("../utils/toNewPatientEntry"));
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientEntries());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.getPatientById(id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const data = req.body;
        const newPatientData = {
            ...data,
            entries: []
        };
        const newPatient = (0, toNewPatientEntry_1.default)(newPatientData);
        const addedPatientEntry = patientService_1.default.addPatient(newPatient);
        res.json(addedPatientEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const entryData = req.body;
        const newEntry = (0, toNewEntry_1.default)(entryData);
        const addedEntry = patientService_1.default.addEntryToPatient(id, newEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
