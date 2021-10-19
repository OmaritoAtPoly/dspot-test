export const sortArray = (a: number, b: number) => a - b;

export const sequentialArrayValidator = (value: number[]) =>
  value.filter((a, i) => a === i + 1);
  