import React, { useCallback, useContext, useMemo, useState } from "react";
import { QueueAppContext } from "../App";
import Table from "../components/table/Table";
import { useColumns } from "../hooks/useColumns";
import STRINGS from "../utils/STRINGS";
import Modal from "../components/modal/Modal";
import AuxillaryContentComponent from "../components/modal/AuxillaryContentComponent";

const HomeContainer = () => {
  const { queueData, handleQueuesValue } = useContext(QueueAppContext);
  const [queueIdToDelete, setQueueIdToDelete] = useState<string>();
  const [queue, setQueue] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = useCallback(
    () => setIsModalOpen(!isModalOpen),
    [isModalOpen, setIsModalOpen]
  );

  const handleDeleteQueue = useCallback(() => {
    const queueToDelete = queueData.filter((a) => a.id !== queueIdToDelete);
    handleQueuesValue(queueToDelete);
    handleModalOpen();
  }, [queueData, handleQueuesValue, queueIdToDelete, handleModalOpen]);
   
  const onDelete = useCallback(
    (id: string) => () => {
      setQueueIdToDelete(id);
      const queueToShow = queueData
      .find((a) => a.id === id)
      ?.queueArray.join(" - ");
      queueToShow && setQueue(queueToShow);
      handleModalOpen();
    },
    [queueData, handleModalOpen]
  );

  const onEdit = (queueId: string) => () => {
    console.log("onEditonEdit", queueId);
  };

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

  return (
    <>
      <Table
        columns={columns}
        data={preparedData}
        emptyText={STRINGS.queue.NO_DATA}
      />
      <Modal handleOpen={handleModalOpen} open={isModalOpen}>
        <AuxillaryContentComponent
          acceptFn={handleDeleteQueue}
          cancelFn={handleModalOpen}
          modalTitle={STRINGS.queue.WARNING_DELETE}
          modalContent={queue}
        />
      </Modal>
    </>
  );
};

export default HomeContainer;
