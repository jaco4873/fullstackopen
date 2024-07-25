import diagnosesData from '../../data/diagnoses';

import { DiagnosisEntry } from '../types';

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnosesData;
};

const getDiagnosisByCode = (code: string): DiagnosisEntry | undefined => {
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