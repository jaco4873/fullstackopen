import { DiagnosisEntry } from '../types';
declare const _default: {
    getDiagnoses: () => DiagnosisEntry[];
    getDiagnosisByCode: (code: string) => DiagnosisEntry | undefined;
    addDiagnosis: () => null;
};
export default _default;
