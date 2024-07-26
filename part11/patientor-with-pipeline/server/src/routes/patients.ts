/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';
import toNewEntry from '../utils/toNewEntry';
import { PatientForm, NewPatient, Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id; 
  const patient = patientService.getPatientById(id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const data: PatientForm = req.body as PatientForm;
    const newPatientData: NewPatient = {
      ...data,
      entries: []
    };
    const newPatient = toNewPatientEntry(newPatientData);

    const addedPatientEntry = patientService.addPatient(newPatient);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id: string = req.params.id; 
    const entryData = req.body as Entry; 
    const newEntry = toNewEntry(entryData);
    const addedEntry = patientService.addEntryToPatient(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
