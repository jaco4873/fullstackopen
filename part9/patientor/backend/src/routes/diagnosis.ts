import express from 'express';

import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnoses());
});

router.get('/:id', (req, res) => {
  const diagnosis = diagnosisService.getDiagnosisByCode(req.params.id);
  res.send(diagnosis);
});

export default router;