import diagnosesData from '../../data/diagnoses';
const getDiagnoses = () => {
    return diagnosesData;
};
const getDiagnosisByCode = (code) => {
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
