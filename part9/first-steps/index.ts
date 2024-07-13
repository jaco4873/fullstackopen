import express from 'express';
import { bmiCalculator } from './utils/bmiCalculator';
import { calculateExercises } from './utils/exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || isNaN(height) || !req.query.weight || isNaN(weight)) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }

  const bmi = bmiCalculator(height, weight);
  return res.send({ "weight": weight, "height": height, "bmi": bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {target, daily_exercises} = req.body;
  
  if (!target || !daily_exercises) {
    return res.status(400).send({ error: "parameters missing" });
  }
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some(isNaN)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = calculateExercises({ target, daily_exercises });
  return res.send({ result });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});