import React, { useCallback, useContext, useMemo, useState } from "react";
import { QueueAppContext } from "../App";
import Table from "../components/table/Table";
import { useColumns } from "../hooks/useColumns";
import STRINGS from "../utils/STRINGS";
import Modal from "../components/modal/Modal";
import AuxillaryContentComponent from "../components/modal/AuxillaryContentComponent";
import {
  queueProblemSolution,
  sequentialArrayValidator,
  sortArray,
} from "../utils/functionalities";

const HomeContainer = () => {
  const { queueData, handleQueuesValue } = useContext(QueueAppContext);

  const [currentQueueIdToHandle, setCurrentQueueIdToHandle] =
    useState<string>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [queueLength, setQueueLength] = useState<number>();
  const [queueDashNotationValue, setQueueDashNotationValue] =
    useState<string>();
  const [sequentialTruthy, setSequentialTruthy] = useState<string>("");

  const currentQueueValueMemoized = useMemo(
    () => queueData.find((a) => a.id === currentQueueIdToHandle),
    [currentQueueIdToHandle, queueData]
  );

  const handleQueuesLength = useCallback(
    (val: number) => setQueueLength(val),
    [setQueueLength]
  );

  const handleQueueDashNotationValue = useCallback(
    (val: string) => setQueueDashNotationValue(val),
    [setQueueDashNotationValue]
  );

  const handleDeleteModalOpen = useCallback(
    () => setIsDeleteModalOpen(!isDeleteModalOpen),
    [isDeleteModalOpen, setIsDeleteModalOpen]
  );

  const handleSequentialTruthyLabel = useCallback(
    (val: string) => {
      setSequentialTruthy(val);
    },
    [setSequentialTruthy]
  );

  const handleEditModalOpen = useCallback(() => {
    setIsEditModalOpen(!isEditModalOpen);
  }, [isEditModalOpen, setIsEditModalOpen]);

  const handleDeleteQueue = useCallback(() => {
    const queueToDelete = queueData.filter(
      (a) => a.id !== currentQueueIdToHandle
    );
    handleQueuesValue(queueToDelete);
    handleDeleteModalOpen();
  }, [
    queueData,
    handleQueuesValue,
    currentQueueIdToHandle,
    handleDeleteModalOpen,
  ]);

  const onDelete = useCallback(
    (id: string) => () => {
      setCurrentQueueIdToHandle(id);
      const queueWithDothNotation = queueData
        .find((a) => a.id === id)
        ?.queueArray.join(" - ");
      if (queueWithDothNotation) {
        handleQueueDashNotationValue(queueWithDothNotation);
      }
      handleDeleteModalOpen();
    },
    [queueData, handleDeleteModalOpen, handleQueueDashNotationValue]
  );

  const onEdit = useCallback(
    (id: string) => () => {
      setCurrentQueueIdToHandle(id);
      handleEditModalOpen();
      const queueToShow = queueData.find((a) => a.id === id);
      if (queueToShow && queueToShow?.queueArray.length) {
        handleQueueDashNotationValue(queueToShow.queueArray.join(" - "));
        handleQueuesLength(queueToShow?.queueArray.length);
      }
    },
    [
      queueData,
      setCurrentQueueIdToHandle,
      handleEditModalOpen,
      handleQueuesLength,
      handleQueueDashNotationValue,
    ]
  );

  const columns = useColumns(onDelete, onEdit);

  const preparedData = useMemo(
    () =>
      queueData
        ?.filter((a) => a.queueArray.length > 0)
        .map((d) => ({
          ...d,
          queueArray: d.queueArray.map((a) => ` ${a} `),
        })),
    [queueData]
  );

  const onCompleteQueue = useCallback(
    (value: string) => {
      const newNumbersArray = value.split("").map((a) => parseInt(a));
      const orderedArray = [...newNumbersArray].sort(sortArray);

      if (
        newNumbersArray.length === sequentialArrayValidator(orderedArray).length
      ) {
        const newQueueDataCopy = [...queueData];
        const queueIndex = queueData.findIndex(
          (a) => a.id === currentQueueIdToHandle
        );
        const solution = queueProblemSolution(newNumbersArray);

        newQueueDataCopy[queueIndex] = {
          ...newQueueDataCopy[queueIndex],
          queueArray: newNumbersArray,
          currentQueueSolution: solution,
        };

        handleQueuesValue(newQueueDataCopy);
        handleEditModalOpen();
        handleSequentialTruthyLabel("true");
      } else {
        handleSequentialTruthyLabel("false");
      }
    },
    [
      handleSequentialTruthyLabel,
      queueData,
      handleQueuesValue,
      handleEditModalOpen,
      currentQueueIdToHandle,
    ]
  );

  return (
    <>
      <Table
        columns={columns}
        data={preparedData}
        emptyText={STRINGS.queue.NO_DATA}
      />
      <Modal handleOpen={handleDeleteModalOpen} open={isDeleteModalOpen}>
        <AuxillaryContentComponent
          acceptFn={handleDeleteQueue}
          cancelFn={handleDeleteModalOpen}
          modalTitle={STRINGS.queue.WARNING_DELETE}
          modalContent={queueDashNotationValue}
        />
      </Modal>
      <Modal handleOpen={handleEditModalOpen} open={isEditModalOpen}>
        <AuxillaryContentComponent
          withButtonElements={false}
          acceptFn={handleDeleteQueue}
          cancelFn={handleEditModalOpen}
          modalTitle={`${STRINGS.queue.WARNING_EDIT} ${queueDashNotationValue}`}
          modalContent={`${STRINGS.queue.CURRENT_SOLUTION} ${currentQueueValueMemoized?.currentQueueSolution}`}
          queueLength={queueLength}
          sequentialTruthy={sequentialTruthy}
          onCompleteQueue={onCompleteQueue}
        />
      </Modal>
    </>
  );
};

export default HomeContainer;
