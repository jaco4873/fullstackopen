// Entry Data Types - Registered to each patient
export var EntryType;
(function (EntryType) {
    EntryType["HealthCheck"] = "HealthCheck";
    EntryType["Hospital"] = "Hospital";
    EntryType["OccupationalHealthcare"] = "OccupationalHealthcare";
})(EntryType || (EntryType = {}));
export var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating || (HealthCheckRating = {}));
// Patient Data Types
export var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (Gender = {}));
