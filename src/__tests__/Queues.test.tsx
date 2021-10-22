import { fireEvent, render, waitFor } from "@testing-library/react";
import QueuesForm from "../components/queues/QueuesForm";
import { queueProblemSolution } from "../utils/functionalities";
import STRINGS from "../utils/STRINGS";

describe("Rendering Queue page", () => {
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

  const setup = async () => {
    const resetQueueLength = jest.fn();
    const handleFormValues = jest.fn();
    const handleAddNewQueueRecord = jest.fn();
    const handleModalVisibility = jest.fn();
    const onCompleteQueue = jest.fn();

    let testUtil = await waitFor(() =>
      render(
        <QueuesForm
          sequentialArray="true"
          problemSolution={0}
          queueLength={0}
          resetQueueLength={resetQueueLength}
          handleFormValues={handleFormValues}
          handleAddNewQueueRecord={handleAddNewQueueRecord}
          handleModalVisibility={handleModalVisibility}
          modalVisibility={false}
          onCompleteQueue={onCompleteQueue}
        />
      )
    );
    return { testUtil };
  };
  test("getting length explanation label ", async () => {
    const { testUtil } = await setup();

    const lengthExplanationLabel = testUtil.getByText(
      STRINGS.queue.QUEUE_LENGTH
    );
    expect(lengthExplanationLabel).toBeDefined();
  });

  test("getting the button and doing submit", async () => {
    const { testUtil } = await setup();

    const button = testUtil.getByRole("button");
    expect(button).toBeDefined();

    //this is to test when the user submit an empty value 
    fireEvent.click(button);
    const errorLabel = await testUtil.findByText(STRINGS.yup.QUEUE_RANGE);
    expect(errorLabel).toBeDefined();
  });

});
