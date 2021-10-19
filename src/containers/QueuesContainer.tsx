import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import QueuesForm from "../components/queues/QueuesForm";
import { sequentialArrayValidator, sortArray } from "../utils/funcionalities";

const QueuesContainer = () => {
  const [queueLength, setQueueLength] = useState<number>(0);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [queueValue, setQueueValue] = useState<string | undefined>();
  const [sequentialArray, setSequential] = useState<string>("");

  const { push } = useHistory();

  const handleAddNewQueueRecord = useCallback(() => {
    push("/");
  }, [push]);

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
