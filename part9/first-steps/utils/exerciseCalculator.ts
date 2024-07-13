interface Input {
  target: number
  daily_exercises: number[]
}

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Rating {
  rating: number
  description: string
}

const handleArguments = (args: string[]): Input => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target: number = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("Provided target was not a number!");
  }

  const daily_exercises: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const num = Number(args[i]);
    if (isNaN(num)) {
      throw new Error("Provided values were not numbers!");
    }
    daily_exercises.push(num);
  }

  return { target, daily_exercises };
};

const calculateRating = (average: number, target: number): Rating => {
  if (average >= target) {
    return { rating: 3, description: "Well done!" };
  } else if (average >= target - 0.5) {
    return { rating: 2, description: "Not too bad but could be better" };
  } else {
    return { rating: 1, description: "You need to work harder" };
  }
};

export const calculateExercises = (input: Input): Result => {
  const days: number = input.daily_exercises.length;
  const trainingDays: number = input.daily_exercises.filter((day) => day > 0).length;
  const average: number = days > 0 ? input.daily_exercises.reduce((a, b) => a + b, 0) / days : 0;
  const target: number = input.target;
  const success: boolean = average >= target;
  const rating: Rating = calculateRating(average, target);

  const result: Result = {
    periodLength: days,
    trainingDays: trainingDays,
    success: success,
    rating: rating.rating,
    ratingDescription: rating.description,
    target: target,
    average: average,
  };

  return result;
};

try {
  console.log(calculateExercises(handleArguments(process.argv)));
} catch (error: unknown) {
  let errorMessage = "something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
    console.log(errorMessage);
  }
}

