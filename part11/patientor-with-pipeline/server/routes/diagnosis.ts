import express from 'express';

import diagnosisService from '../services/diagnosisService';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnoses());
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id as string;
  const diagnosis = diagnosisService.getDiagnosisByCode(id);
  res.send(diagnosis);
});

export default router;