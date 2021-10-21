import STRINGS from "./STRINGS";

export const sortArray = (a: number, b: number) => a - b;

export const sequentialArrayValidator = (value: number[]) =>
  value.filter((a, i) => a === i + 1);

export const queueProblemSolution = (val: number[]) => {
    let bribesCounter = 0;
    for (let i = val.length - 1; i >= 0; i--) {
      if (val[i] - i > 3) return (STRINGS.queue.TOO_CHAOTIC);
      for (let j = val[i] - 2; j < i; j++) {
        if (val[j] > val[i]) bribesCounter++;
      }
    }
    return bribesCounter;
};
