import React from "react";
import { RowRecord, TableColumn } from "react-data-table-component";
import STRINGS from "../../utils/STRINGS";
import { QueueElementsType } from "../../utils/types.d";
import AuxillaryContentComponent from "../modal/AuxillaryContentComponent";
import Modal from "../modal/Modal";
import Table from "../table/Table";

interface Props {
  handleDeleteQueue: () => void;
  handleDeleteModalOpen: () => void;
  handleEditModalOpen: () => void;
  onCompleteQueue: (val: string) => void;
  queueDashNotationValue?: string;
  columns: TableColumn<RowRecord>[];
  preparedData: RowRecord[];
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  queueLength?: number;
  sequentialTruthy: string;
  currentQueueValueMemoized?: QueueElementsType;
}
const HomeForm = ({
  columns,
  preparedData,
  isDeleteModalOpen,
  queueDashNotationValue,
  isEditModalOpen,
  queueLength,
  sequentialTruthy,
  currentQueueValueMemoized,
  handleDeleteModalOpen,
  handleDeleteQueue,
  handleEditModalOpen,
  onCompleteQueue,
}: Props) => (
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

export default HomeForm;
