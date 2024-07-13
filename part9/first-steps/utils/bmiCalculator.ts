interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return { height, weight };
};

export const bmiCalculator = (height: number, weight: number): string => {
  const bmi: number = weight / (height/100)**2;
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
  } else if (bmi >= 30) {
      return 'Obese';
  }
  return "Invalid BMI. Please check your input values.";
};

try {
  const { height, weight } = parseArguments(process.argv);
  const result: string = bmiCalculator(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "something bad happened";
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
  }
}