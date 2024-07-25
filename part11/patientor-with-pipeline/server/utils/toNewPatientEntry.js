import { Gender } from '../../shared/types';
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isEntryArray = (entries) => {
    return Array.isArray(entries);
};
const parseEntry = (entries) => {
    if (!entries || !isEntryArray(entries)) {
        throw new Error('Incorrect or missing entries');
    }
    return entries;
};
const parseString = (string) => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing field');
    }
    return string;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newEntry = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: parseEntry(object.entries)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
export default toNewPatientEntry;
