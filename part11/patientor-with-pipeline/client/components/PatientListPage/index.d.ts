import { Patient } from '../../../shared/types';
interface Props {
    patients: Patient[];
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}
declare const PatientListPage: ({ patients, setPatients }: Props) => import("react/jsx-runtime").JSX.Element;
export default PatientListPage;
