import moment from "moment";
import { nanoid } from "nanoid";
import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { QueueAppContext } from "../App";
// import { queuesElements } from "../appStore/store";
import QueuesForm from "../components/queues/QueuesForm";
import { useQueueProblemSolution } from "../hooks/useQueueProblemSolution";
import { sequentialArrayValidator, sortArray } from "../utils/funcionalities";

const QueuesContainer = () => {
  const [queueLength, setQueueLength] = useState<number>(0);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [queueValue, setQueueValue] = useState<string | undefined>();
  const [sequentialArray, setSequential] = useState<string>("");
  const [queueArrayValue, setQueueArrayValue] = useState<number[]>([0]);

  const { push } = useHistory();
  const {queueData, handleQueuesValue} = useContext(QueueAppContext); 

  const problemAnswer = useQueueProblemSolution();

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
      setQueueLength(val.queueInputValue);
    },
    [setQueueLength]
  );

  const onCompleteQueue = useCallback(
    (value: string) => {
      const newNumbersArray = value.split("").map((a) => parseInt(a));
      const orderedArray = [...newNumbersArray].sort(sortArray);

      if (
        newNumbersArray.length === sequentialArrayValidator(orderedArray).length
      ) {
        setSequential("true");
        setQueueValue(value.split("").join(" - "));
        setQueueArrayValue(newNumbersArray);
        handleModalVisibility();
      } else {
        setSequential("false");
      }
    },
    [handleModalVisibility, setQueueValue]
  );

  return (
    <QueuesForm
      queueLength={queueLength}
      modalVisibility={modalVisibility}
      queueValue={queueValue}
      sequentialArray={sequentialArray}
      resetQueueLength={setQueueLength}
      handleFormValues={handleFormValues}
      onCompleteQueue={onCompleteQueue}
      handleModalVisibility={handleModalVisibility}
      handleAddNewQueueRecord={handleAddNewQueueRecord}
    />
  );
};

export default QueuesContainer;
