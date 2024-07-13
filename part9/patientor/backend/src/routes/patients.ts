/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage= 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage); 
  }
});

export default router;