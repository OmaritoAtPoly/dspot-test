import { render, screen } from "@testing-library/react";
import { queueProblemSolution } from "../utils/functionalities";
import STRINGS from "../utils/STRINGS";

describe("Testing the queue resolver", () => {
   
    test("given a set of queues, assert the correct solution", () => {
    
        const queueExample1 = [1, 2, 3];
        const queueExample2 = [3, 2, 1];
        const queueExample3 = [4, 2, 3, 1];
        const queueExample4 = [2, 4, 5, 3, 1];
        const queueExample5 = [5, 4, 2, 3, 1];

        const response1 = queueProblemSolution(queueExample1);
        const response2 = queueProblemSolution(queueExample2);
        const response3 = queueProblemSolution(queueExample3);
        const response4 = queueProblemSolution(queueExample4);
        const response5 = queueProblemSolution(queueExample5);

        expect(response1).toBe(0);
        expect(response2).toBe(3);
        expect(response3).toBe(STRINGS.queue.TOO_CHAOTIC);
        expect(response4).toBe(6);
        expect(response5).toBe(STRINGS.queue.TOO_CHAOTIC);
    }); 
  });