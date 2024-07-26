/* eslint-disable @typescript-eslint/no-unsafe-call */

import express from "express";
import path from "path";
import patientsRouter from "./routes/patients";
import diagnosisRouter from "./routes/diagnosis";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const cors = require('cors');

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const staticPath: string = path.resolve(__dirname, '../../client/dist');
console.log(`Serving static files from: ${staticPath}`);
app.use(express.static(staticPath));

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* eslint-enable @typescript-eslint/no-unsafe-call */