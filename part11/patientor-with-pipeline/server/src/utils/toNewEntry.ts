import { EntryWithoutId, HealthCheckRating, Diagnosis } from '../types';

// Type Guards
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return isNumber(param) && Object.values(HealthCheckRating).includes(param);
};

const isDischarge = (discharge: unknown): discharge is { date: string, criteria: string } => {
  return typeof discharge === 'object' && discharge !== null &&
    'date' in discharge && isString((discharge as { date: string }).date) &&
    'criteria' in discharge && isString((discharge as { criteria: string }).criteria);
};

const isSickLeave = (sickLeave: unknown): sickLeave is { startDate: string, endDate: string } => {
  return typeof sickLeave === 'object' && sickLeave !== null &&
    'startDate' in sickLeave && isString((sickLeave as { startDate: string }).startDate) &&
    'endDate' in sickLeave && isString((sickLeave as { endDate: string }).endDate);
};

// Parsing Functions
const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error('Incorrect or missing field: ' + value);
  }
  return value;
};

const parseDate = (value: unknown): string => {
  if (!isString(value) || !isDate(value)) {
    throw new Error('Incorrect or missing date: ' + value);
  }
  return value;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!Array.isArray(object) || !object.every(code => typeof code === 'string')) {
    throw new Error('Incorrect or missing diagnosis codes');
  }
  return object;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const parseEntryType = (type: unknown): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  if (!isString(type) || !['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(type)) {
    throw new Error('Incorrect or missing entry type: ' + type);
  }
  return type as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria),
  };
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave: ');
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

// Main Function
const toNewEntry = (object: unknown): EntryWithoutId => {
  if (typeof object !== 'object' || object === null) {
    throw new Error('Incorrect or missing data');
  }

  const { type, description, date, specialist, diagnosisCodes } = object as {
    type: unknown;
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown;
  };

  const baseEntry = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };

  const entryType = parseEntryType(type);

  switch (entryType) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating((object as { healthCheckRating: unknown }).healthCheckRating),
      };
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge((object as { discharge: unknown }).discharge),
      };
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString((object as { employerName: unknown }).employerName),
        sickLeave: parseSickLeave((object as { sickLeave: unknown }).sickLeave),
      };
    default:
      return assertNever(entryType);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

export default toNewEntry;
