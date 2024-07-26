"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-call */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const patients_1 = __importDefault(require("./routes/patients"));
const diagnosis_1 = __importDefault(require("./routes/diagnosis"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const app = (0, express_1.default)();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
const PORT = 3001;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const staticPath = path_1.default.resolve(__dirname, '../../client/dist');
console.log(`Serving static files from: ${staticPath}`);
app.use(express_1.default.static(staticPath));
app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
app.use('/api/patients', patients_1.default);
app.use('/api/diagnoses', diagnosis_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
/* eslint-enable @typescript-eslint/no-unsafe-call */ 
