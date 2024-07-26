import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import { Patient } from "../../types";
import { useParams } from 'react-router-dom';

import { getById } from '../../services/patientService';
import { getByCode } from '../../services/diagnosisService';
import EntryDetails from './EntryDetails';
import EntryForm from './EntryForm';

const PatientView: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>(); 
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosisDescriptions, setDiagnosisDescriptions] = useState<{ [code: string]: string }>({});
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: Patient = await getById(id);
        setPatient(data);

        const diagnosisCodes = Array.from(data.entries.flatMap(entry => entry.diagnosisCodes || []));
        const descriptions = await Promise.all(
          diagnosisCodes.map(async (code) => {
            const diagnosis = await getByCode(code);
            return { [code]: diagnosis.name };
          })
        );
        setDiagnosisDescriptions(descriptions.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
      } catch (e) {
        console.error('Failed to fetch patient data:', e);
      }
    };
    void fetchPatient();
  }, [id, refetchTrigger]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <h1>Patient: {patient.name}</h1>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Occupation</TableCell>
            <TableCell>{patient.occupation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gender</TableCell>
            <TableCell>{patient.gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>SSN</TableCell>
            <TableCell>{patient.ssn}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <EntryDetails entries={patient.entries} diagnosisDescriptions={diagnosisDescriptions} />
      <EntryForm patientId={id} onEntryAdded={() => setRefetchTrigger(!refetchTrigger)} />
    </div>
  );
};

export default PatientView;
