import moment from "moment";
import { nanoid } from "nanoid";
import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { QueueAppContext } from "../App";
import QueuesForm from "../components/queues/QueuesForm";
import { useQueueProblemSolution } from "../hooks/useQueueProblemSolution";
import { sequentialArrayValidator, sortArray } from "../utils/funcionalities";

const QueuesContainer = () => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [queueLength, setQueueLength] = useState<number>(0); 
  const [queueDashNotationValue, setQueueDashNotationValue] = useState<string>(); 
  const [queueArrayValue, setQueueArrayValue] = useState<number[]>([0]);
  const [sequentialTruthy, setSequentialTruthy] = useState<string>("");
  
  
  const { push } = useHistory();
  const {
    queueData,
    handleQueuesValue,
  } = useContext(QueueAppContext);
  
  const problemAnswer = useQueueProblemSolution();

  const handleQueuesLength = useCallback((val: number) => setQueueLength(val), [setQueueLength]);
  
  const handleQueueDashNotationValue = useCallback((val: string) => setQueueDashNotationValue(val), [setQueueDashNotationValue]);

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
      currentQueueSolution: problemAnswer,
      queueArray: queueArrayValue,
    };

    const newValue = [...queueData, newPreparedQueueValue];
    handleQueuesValue(newValue);
    push("/");
  }, [push, problemAnswer, queueArrayValue, handleQueuesValue, queueData]);

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

      if (
        newNumbersArray.length === sequentialArrayValidator(orderedArray).length
      ) {
        handleSequentialTruthyLabel("true");
        handleQueueDashNotationValue(value.split("").join(" - "));
        handleQueueArrayValue(newNumbersArray);
        handleModalVisibility();
      } else {
        handleSequentialTruthyLabel("false");
      }
    },
    [handleModalVisibility, handleQueueDashNotationValue, handleQueueArrayValue, handleSequentialTruthyLabel]
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
    />
  );
};

export default QueuesContainer;
