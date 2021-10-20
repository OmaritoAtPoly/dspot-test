import { useMemo } from "react";
import { RowRecord, TableColumn } from "react-data-table-component";
import ActionButton from "../components/table/ActionButton";
import STRINGS from "../utils/STRINGS";

export const useColumns = (
  onDelete: (id: string) => () => void,
  onEdit:   (id: string) => () => void
) => {

  const columns = useMemo(
    () =>
      [
        {
          name: STRINGS.table.QUEUE_ARRAY,
          key: "queueArray",
          width: "25%",
          grow: 0,
        },
        {
          name: STRINGS.table.CREATED_AT,
          key: "createdAt",
          width: "25%",
          grow: 0,
        },
        {
          name: STRINGS.table.QUEUE_BRIBES,
          key: "currentQueueSolution",
          width: "25%",
          grow: 0,
        },
        {
          name: "ACTIONS",
          width: "25%",
          grow: 0,
          cell: ({ id }: RowRecord) => (
            <ActionButton
              OnEdit={onEdit(id as string)}
              onDelete={onDelete(id as string)}
              titleEdit={STRINGS.queue.EDIT}
              titleDelete={STRINGS.queue.DELETE}
            />
          ),
        },
      ] as any as TableColumn<RowRecord>[],
    [onEdit, onDelete]
  );

  return columns;
};
