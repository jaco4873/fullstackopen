import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";

interface EntryDetailsProps {
  entries: Entry[];
  diagnosisDescriptions: { [code: string]: string };
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

// Type Guards
const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => entry.type === 'HealthCheck';
const isHospitalEntry = (entry: Entry): entry is HospitalEntry => entry.type === 'Hospital';
const isOccupationalHealthcareEntry = (entry: Entry): entry is OccupationalHealthcareEntry => entry.type === 'OccupationalHealthcare';

const EntryDetails: React.FC<EntryDetailsProps> = ({ entries, diagnosisDescriptions }) => {
  const renderEntryDetails = (entry: Entry): JSX.Element | null => {
    switch (entry.type) {
      case 'HealthCheck':
        if (isHealthCheckEntry(entry)) {
          return (
            <div>
              <p>Health Check Rating: {entry.healthCheckRating}</p>
            </div>
          );
        } else {
          return assertNever(entry);
        }
      case 'Hospital':
        if (isHospitalEntry(entry)) {
          return (
            <div>
              <p>Discharge Date: {entry.discharge.date}</p>
              <p>Discharge Criteria: {entry.discharge.criteria}</p>
            </div>
          );
        } else {
          return assertNever(entry);
        }
      case 'OccupationalHealthcare':
        if (isOccupationalHealthcareEntry(entry)) {
          return (
            <div>
              <p>Employer Name: {entry.employerName}</p>
              {entry.sickLeave && (
                <p>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
              )}
            </div>
          );
        } else {
          return assertNever(entry);
        }
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h2>Entries</h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Other Details</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Diagnosis Codes</strong></TableCell>
            <TableCell><strong>Specialist</strong></TableCell>
          </TableRow>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.type}</TableCell>
              <TableCell>{renderEntryDetails(entry)}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell>
                {entry.diagnosisCodes?.map((code) => (
                  <div key={code}>
                    {code} - {diagnosisDescriptions[code] || 'No descriptions exist...'}
                  </div>
                ))}
              </TableCell>
              <TableCell>{entry.specialist}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EntryDetails;
