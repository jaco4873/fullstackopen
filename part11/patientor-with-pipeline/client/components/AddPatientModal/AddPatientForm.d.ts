import { PatientForm } from "../../../shared/types";
interface Props {
    onCancel: () => void;
    onSubmit: (values: PatientForm) => void;
}
declare const AddPatientForm: ({ onCancel, onSubmit }: Props) => import("react/jsx-runtime").JSX.Element;
export default AddPatientForm;
