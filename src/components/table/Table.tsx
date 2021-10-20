import React, { useMemo } from "react";
import DataTable, {
  RowRecord,
  TableColumn
} from "react-data-table-component";

interface Props {
  columns?: TableColumn<RowRecord>[];
  data?: RowRecord[];
  emptyText?: string;
}

const columStyle = {
  borderRight: "1px solid #dee2e6",
};

const Table = ({
  columns = [],
  data = [],
  emptyText = "",
}: Props) => {

  const sortFunction =
    (key: string) =>
    (rowA: Record<string, string>, rowB: Record<string, string>) => {
      const a =
        typeof rowA[key] === "string" ? rowA[key].toLowerCase() : rowA[key];
      const b =
        typeof rowB[key] === "string" ? rowB[key].toLowerCase() : rowB[key];

      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    };

  const preparedColumnsToTable = columns
    .filter((f: any) => !f.hidden)
    .map((c: TableColumn<RowRecord> & { key?: string }, index) => ({
      ...c,
      id: index + 1,
      reorder: true,
      selector:
        c.key && !c.selector
          ? (row: Record<string, string>) => row[(c as { key: string }).key]
          : c.selector,
      sortFunction: c.sortFunction
        ? c.sortFunction
        : sortFunction((c as { key: string }).key),
      style: { ...c.style, ...columStyle, sortable: true },
    }));

  const preparedDataToTable = useMemo(
    () =>
      data.map((d) => {
        const r = {} as RowRecord;
        const keys = Object.keys(d);
        keys.forEach((k) => {
          if ((columns.find((c: any) => c.key === k) as any)?.hidden !== true) {
            r[k] = d[k];
          }
        });
        return r;
      }),
    [columns, data]
  );

  return (
    <DataTable
      data={preparedDataToTable}
      columns={preparedColumnsToTable as any as TableColumn<RowRecord>[]}
      noDataComponent={
        <div>
          <span>{emptyText}</span>
        </div>
      }
    />
  );
};

export default Table;
