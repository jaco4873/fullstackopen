import diagnosesData from '../../data/diagnoses.ts';

import { DiagnosisEntry } from '../types/diagnosis.ts';



const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnosesData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};