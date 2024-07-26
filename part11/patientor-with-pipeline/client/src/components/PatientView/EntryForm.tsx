import { useEffect, useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { getAll } from '../../services/diagnosisService';
import { createEntry  } from '../../services/patientService';
import { EntryType, HealthCheckRating, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, Diagnosis } from '../../types';

type EntryFormProps = {
  patientId: string; 
  onEntryAdded: () => void;
};

const EntryForm: React.FC<EntryFormProps> = ({ patientId, onEntryAdded }) => {
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [specialist, setSpecialist] = useState<string>('');
  const [allDiagnosisCodes, setAllDiagnosisCodes] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      const diagnoses = await getAll();
      setAllDiagnosisCodes(diagnoses);
    };

    void fetchDiagnosisCodes();
  }, []);


  const handleTypeChange = (e: SelectChangeEvent<EntryType>) => {
    setType(e.target.value as EntryType);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const handleHealthCheckRating = (e: SelectChangeEvent<HealthCheckRating>) => {
    setHealthCheckRating(e.target.value as HealthCheckRating);
  };
  
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    submitNewPatient(event).catch((e) => {
      console.error("Unhandled promise rejection:", e);
    });
  };

  const submitNewPatient  = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      switch (type) {
        case EntryType.HealthCheck: {
          const newEntry: Omit<HealthCheckEntry, 'id'> = {
            type: 'HealthCheck',
            date,
            description,
            specialist,
            diagnosisCodes,
            healthCheckRating
          };
          await createEntry(patientId, newEntry);
          break;
        }
        case EntryType.OccupationalHealthcare: {
          const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
            type: 'OccupationalHealthcare',
            date,
            description,
            specialist,
            diagnosisCodes,
            employerName,
            sickLeave: sickLeaveStartDate && sickLeaveEndDate ? {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate
            } : undefined
          };
          await createEntry(patientId, newEntry);
          break;
        }
        case EntryType.Hospital: {
          const newEntry: Omit<HospitalEntry, 'id'> = {
            type: 'Hospital',
            date,
            description,
            specialist,
            diagnosisCodes,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria
            }
          };
          await createEntry(patientId, newEntry);
          break;
        }
        default:
          throw new Error(`Unsupported entry type: ${type}`);
      }
      onEntryAdded();
      setDate('');
      setDescription('');
      setSpecialist('');
      setDiagnosisCodes([]);
    } catch (e) {
      console.error('Failed to create entry', e);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <br></br>
      <h2> Add New Entry </h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth >
            <InputLabel required >Type</InputLabel>
            <Select value={type} onChange={handleTypeChange} >
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        {type === EntryType.HealthCheck && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel required>Health Check Rating</InputLabel>
              <Select value={healthCheckRating} onChange={handleHealthCheckRating}>
                <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
                <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
                <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
                <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        {type === EntryType.OccupationalHealthcare && (
          <>
            <Grid item xs={12}>
              <TextField
                required
                label="Employer Name"
                fullWidth
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Sick Leave Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={sickLeaveStartDate}
                onChange={(e) => setSickLeaveStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Sick Leave End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={sickLeaveEndDate}
                onChange={(e) => setSickLeaveEndDate(e.target.value)}
              />
            </Grid>
          </>
        )}
        {type === EntryType.Hospital && (
          <>
            <Grid item xs={6}>
              <TextField
                required
                label="Discharge Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                label="Discharge Criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              multiple
              value={diagnosisCodes}
              onChange={handleDiagnosisCodesChange}
              input={<OutlinedInput label="Diagnosis Codes" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}
            >
              {allDiagnosisCodes.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  <Checkbox checked={diagnosisCodes.indexOf(diagnosis.code) > -1} />
                  <ListItemText primary={diagnosis.code} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EntryForm;
