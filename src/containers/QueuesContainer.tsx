import { debounce } from "lodash";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import QueuesForm from "../components/QueuesForm";

const QueuesContainer = () => {
  const [queueLength, setQueueLength] = useState<number>(0);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [queueValue, setQueueValue] = useState<string | undefined>();
  const [sequential, setSequential] = useState<string>("");

  const { push } = useHistory();

  const handleAddNewQueueRecord = useCallback(() => {
    push("/");
  }, [push]);

  const handleModalVisibility = useCallback(
    () => setModalVisibility(!modalVisibility),
    [setModalVisibility, modalVisibility]
  );

  const handleInputValue = useCallback(
    (value: ChangeEvent<HTMLInputElement>) => {
      return setQueueLength(Number(value.target.value));
    },
    [setQueueLength]
  );

  const debouncedOnType = useMemo(
    () => debounce(handleInputValue, 1000),
    [handleInputValue]
  );

  const queueLengthMemoized = useMemo(() => {
    if (isNaN(queueLength) || queueLength > 9) return 0;
    return queueLength;
  }, [queueLength]);

  const sortArray = (a: number, b: number) => a - b;
  const sequentialArray = (value: number[]) =>
    value.filter((a, i) => a === i + 1);

  const onCompleteQueue = useCallback(
    (value: string) => {
      const newNumbersArray = value.split("").map((a) => parseInt(a));
      const ordered = [...newNumbersArray].sort(sortArray);

      if (newNumbersArray.length === sequentialArray(ordered).length) {
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
      queueLength={queueLengthMemoized}
      handleInputValue={debouncedOnType}
      modalVisibility={modalVisibility}
      queueValue={queueValue}
      sequential={sequential}
      onCompleteQueue={onCompleteQueue}
      handleModalVisibility={handleModalVisibility}
      handleAddNewQueueRecord={handleAddNewQueueRecord}
    />
  );
};

export default QueuesContainer;
