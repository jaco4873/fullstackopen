import { HealthCheckRating } from '../types';
// Type Guards
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (num) => {
    return typeof num === 'number' || num instanceof Number;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isHealthCheckRating = (param) => {
    return isNumber(param) && Object.values(HealthCheckRating).includes(param);
};
const isDischarge = (discharge) => {
    return typeof discharge === 'object' && discharge !== null &&
        'date' in discharge && isString(discharge.date) &&
        'criteria' in discharge && isString(discharge.criteria);
};
const isSickLeave = (sickLeave) => {
    return typeof sickLeave === 'object' && sickLeave !== null &&
        'startDate' in sickLeave && isString(sickLeave.startDate) &&
        'endDate' in sickLeave && isString(sickLeave.endDate);
};
// Parsing Functions
const parseString = (value) => {
    if (!isString(value)) {
        throw new Error('Incorrect or missing field: ' + value);
    }
    return value;
};
const parseDate = (value) => {
    if (!isString(value) || !isDate(value)) {
        throw new Error('Incorrect or missing date: ' + value);
    }
    return value;
};
const parseDiagnosisCodes = (object) => {
    if (!Array.isArray(object) || !object.every(code => typeof code === 'string')) {
        throw new Error('Incorrect or missing diagnosis codes');
    }
    return object;
};
const parseHealthCheckRating = (rating) => {
    if (!isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};
const parseEntryType = (type) => {
    if (!isString(type) || !['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(type)) {
        throw new Error('Incorrect or missing entry type: ' + type);
    }
    return type;
};
const parseDischarge = (discharge) => {
    if (!isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria),
    };
};
const parseSickLeave = (sickLeave) => {
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
const toNewEntry = (object) => {
    if (typeof object !== 'object' || object === null) {
        throw new Error('Incorrect or missing data');
    }
    const { type, description, date, specialist, diagnosisCodes } = object;
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
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
        case 'Hospital':
            return {
                ...baseEntry,
                type: 'Hospital',
                discharge: parseDischarge(object.discharge),
            };
        case 'OccupationalHealthcare':
            return {
                ...baseEntry,
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave),
            };
        default:
            return assertNever(entryType);
    }
};
const assertNever = (value) => {
    throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};
export default toNewEntry;
