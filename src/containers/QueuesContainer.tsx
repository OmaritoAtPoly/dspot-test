import moment from "moment";
import { nanoid } from "nanoid";
import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { QueueAppContext } from "../App";
import QueuesForm from "../components/queues/QueuesForm";
import {
  queueProblemSolution,
  sequentialArrayValidator,
  sortArray
} from "../utils/functionalities";

const QueuesContainer = () => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [queueLength, setQueueLength] = useState<number>(0);
  const [queueDashNotationValue, setQueueDashNotationValue] =
    useState<string>();
  const [queueArrayValue, setQueueArrayValue] = useState<number[]>([0]);
  const [sequentialTruthy, setSequentialTruthy] = useState<string>("");
  const [problemSolution, setProblemSolution] = useState<string | number>("");

  const handleProblemSolution = useCallback((val: number | string) => setProblemSolution(val), [setProblemSolution]);

  const { push } = useHistory();
  const { queueData, handleQueuesValue } = useContext(QueueAppContext);

  const handleQueuesLength = useCallback(
    (val: number) => setQueueLength(val),
    [setQueueLength]
  );

  const handleQueueDashNotationValue = useCallback(
    (val: string) => setQueueDashNotationValue(val),
    [setQueueDashNotationValue]
  );

  const handleQueueArrayValue = useCallback(
    (val: number[]) => {
      setQueueArrayValue(val);
    },
    [setQueueArrayValue]
  );

  const handleSequentialTruthyLabel = useCallback(
    (val: string) => {
      setSequentialTruthy(val);
    },
    [setSequentialTruthy]
  );

  const handleAddNewQueueRecord = useCallback(() => {
    const newPreparedQueueValue = {
      id: nanoid(4),
      createdAt: moment().format("hh:mm:s A").toString(),
      queueArray: queueArrayValue,
      currentQueueSolution: problemSolution,
    };

    const newValue = [...queueData, newPreparedQueueValue];
    handleQueuesValue(newValue);
    push("/");
  }, [push, queueArrayValue, handleQueuesValue, queueData, problemSolution]);

  const handleModalVisibility = useCallback(
    () => setModalVisibility(!modalVisibility),
    [setModalVisibility, modalVisibility]
  );

  const handleFormValues = useCallback(
    (val: { queueInputValue: number }) => {
      handleQueuesLength(val.queueInputValue);
    },
    [handleQueuesLength]
  );

  const onCompleteQueue = useCallback(
    (value: string) => {
      const newNumbersArray = value.split("").map((a) => parseInt(a));
      const orderedArray = [...newNumbersArray].sort(sortArray);
      const solution = queueProblemSolution(newNumbersArray);
      if (
        newNumbersArray.length === sequentialArrayValidator(orderedArray).length
      ) {
        handleSequentialTruthyLabel("true");
        handleQueueDashNotationValue(value.split("").join(" - "));
        handleQueueArrayValue(newNumbersArray);
        handleModalVisibility();
        handleProblemSolution(solution);
      } else {
        handleSequentialTruthyLabel("false");
      }
    },
    [
      handleModalVisibility,
      handleQueueDashNotationValue,
      handleQueueArrayValue,
      handleSequentialTruthyLabel,
      handleProblemSolution,
    ]
  );

  return (
    <QueuesForm
      queueLength={queueLength}
      modalVisibility={modalVisibility}
      queueDashNotationValue={queueDashNotationValue}
      sequentialArray={sequentialTruthy}
      resetQueueLength={handleQueuesLength}
      handleFormValues={handleFormValues}
      onCompleteQueue={onCompleteQueue}
      handleModalVisibility={handleModalVisibility}
      handleAddNewQueueRecord={handleAddNewQueueRecord}
      problemSolution={problemSolution}
    />
  );
};

export default QueuesContainer;
