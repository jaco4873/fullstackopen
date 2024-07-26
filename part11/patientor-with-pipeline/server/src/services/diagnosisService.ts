import diagnosesData from '../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

const getDiagnosisByCode = (code: string): Diagnosis | undefined => {
  return diagnosesData.find(d => d.code === code);
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  getDiagnosisByCode,
  addDiagnosis
};