import { Entry } from '../../../shared/types';
interface EntryDetailsProps {
    entries: Entry[];
    diagnosisDescriptions: {
        [code: string]: string;
    };
}
declare const EntryDetails: React.FC<EntryDetailsProps>;
export default EntryDetails;
