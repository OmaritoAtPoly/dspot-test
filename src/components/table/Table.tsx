/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useRef } from "react";
import DataTable, {
  ChangeRowsPerPage,
  RowRecord,
  TableColumn,
} from "react-data-table-component";
// import toast from "react-hot-toast";
// import { useReactToPrint } from "react-to-print";
// import { useTranslator } from "../../locale/i18n";
// import { copyInClipboard } from "../../modules/exports/Clipboard";
// import {
//   convertArrayOfObjectsToCSV,
//   downloadCSV,
// } from "../../modules/exports/csv";
// import { createPdf } from "../../modules/exports/pdf";
// import { styleColumnByKeys } from "../../modules/exports/styleColumnByKeys";
// import { downloadExcel } from "../../modules/exports/xlsx";
// import { useCurrentRoleQuery } from "../../modules/user/queries";
// import { fullDateFormat } from "../../utils/date";
// import {
//   pickKeysByEntityToExport,
//   prepareKeysNameToExport,
// } from "./prepareDataToExport";
// import ToolBarTable from "./ToolBarTable";

interface Props {
  // entityType?: GeneralNameSpace.Entities;
  columns?: TableColumn<RowRecord>[];
  data?: RowRecord[];
  title?: string;
  withPagination?: boolean;
  onSelectedRowsChange?: (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: RowRecord[];
  }) => void;
  onSort?: (
    selectedColumn: TableColumn<RowRecord>,
    sortDirection: "asc" | "desc",
  ) => void;
  handlePerRowsChange?: ChangeRowsPerPage;
  paginationTotalRows?: number;
  paginationDefaultPage?: number;
  paginationPerPage?: number;
  handlePageChange?: (page: number, totalRows: number) => void;
  rowsPerPageText?: string;
  rangeSeparatorText?: string;
  selectAllRowsItem?: boolean;
  selectAllRowsItemText?: string;
  emptyText?: string;
  q?: string;
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
  defaultSortField?: string;
  defaultSortAsc?: boolean;
  width?: string[];
}

// const conditionalRowStyles: ConditionalStyles<RowRecord>[] = [
//   {
//     when: (row: RowRecord) => (row as { index: number }).index % 2 === 0,
//     style: {
//       backgroundColor: "rgba(0, 0, 0, 0.05)",
//     },
//   },
// ];

const columStyle = {
  borderRight: "1px solid #dee2e6",
};

const Table = ({
  // entityType,
  withPagination = true,
  title = "",
  columns = [],
  data = [],
  onSelectedRowsChange,
  paginationTotalRows,
  paginationDefaultPage,
  paginationPerPage,
  handlePageChange,
  rowsPerPageText,
  rangeSeparatorText,
  selectAllRowsItem = false,
  selectAllRowsItemText,
  handlePerRowsChange,
  emptyText = "",
  onSort,
  q,
  onSearch,
  defaultSortField,
  defaultSortAsc,
  width,
}: Props) => {
  // const { data: role } = useCurrentRoleQuery();
  // const { t } = useTranslator();

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
    .map((c: TableColumn<RowRecord> & { key?: string }, index) =>
      // TODO CHECK THIS COMMENTED LINE UNTIL WE CAN SEE THERE IS NO BUG
      // if (i === columns.length - 1) return c;
      ({
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
      }),
    );

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
    [columns, data],
  );

  // const paginationComponentOptions = {
  //   rowsPerPageText,
  //   rangeSeparatorText,
  //   selectAllRowsItem,
  //   selectAllRowsItemText,
  // };
  // const fileName = `${title}_${moment().format(fullDateFormat)}`;

  // prepare data to export
  // const pickedData = pickKeysByEntityToExport({
  //   data,
  //   entity: entityType,
  //   role: role?.role,
  // });
  // const dataToExport = prepareKeysNameToExport(pickedData, entityType);
  // const styleColumnToExport = useMemo(
  //   () => (pickedData.length ? styleColumnByKeys(pickedData[0]) : []),
  //   [pickedData],
  // );
  // print
  const componentRef = useRef<React.ReactInstance>();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current as React.ReactInstance,
  // });
  // csv
  // const handleCSV = useCallback(() => {
  //   downloadCSV({ data: pickedData, fileNameParam: fileName });
  // }, [pickedData, fileName]);
  // copy
  // const handleCopy = useCallback(() => {
  //   const textToCopy = convertArrayOfObjectsToCSV(dataToExport);
  //   copyInClipboard(textToCopy);
  //   toast.success(t("general.COPIED_CLIP_BOARD"));
  // }, [dataToExport, t]);
  // excel
  // const handleExcel = useCallback(() => {
  //   downloadExcel(dataToExport, styleColumnToExport, fileName);
  // }, [dataToExport, fileName, styleColumnToExport]);
  // pdf
  // const handlePdf = useCallback(() => {
  //   createPdf(dataToExport, fileName, title, width);
  // }, [dataToExport, fileName, title, width]);

  // const defaultSortFieldId = useMemo(
  //   () =>
  //     preparedColumnsToTable.find(
  //       (c) =>
  //         c.key === defaultSortField || (c as any).keySort === defaultSortField,
  //     )?.id || null,
  //   [defaultSortField, preparedColumnsToTable],
  // );

  // const paginationRowsPerPageOptions = useMemo(() => {
  //   const elem = parseInt(`${paginationPerPage}` || "1", 10);
  //   const finalElem = paginationTotalRows || 100;
  //   const arr = [elem, elem * 2, elem * 4, finalElem, 10, 20, 50];
  //   return [...(new Set(arr) as any)].sort((a, b) => a - b);
  // }, [paginationPerPage, paginationTotalRows]);

  return (
    <div className="card-body">
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        {/* <ToolBarTable
          handleCSV={handleCSV}
          handlePrint={handlePrint || (() => {})}
          handlePdf={handlePdf || (() => {})}
          handleCopy={handleCopy || (() => {})}
          handleExcel={handleExcel}
          q={q}
          onSearch={onSearch}
        /> */}
        <div
          ref={componentRef as React.LegacyRef<HTMLDivElement> | undefined}
          className="row">
          <div className="col-sm-12">
            <DataTable
              data={preparedDataToTable}
              columns={
                preparedColumnsToTable as any as TableColumn<RowRecord>[]
              }
              // onSelectedRowsChange={onSelectedRowsChange}
              // conditionalRowStyles={conditionalRowStyles}
              // pagination={withPagination}
              // paginationServer
              // paginationTotalRows={paginationTotalRows}
              // paginationDefaultPage={paginationDefaultPage}
              // paginationRowsPerPageOptions={paginationRowsPerPageOptions}
              // paginationPerPage={paginationPerPage}
              // onChangePage={handlePageChange}
              // paginationComponentOptions={paginationComponentOptions}
              // onChangeRowsPerPage={handlePerRowsChange}
              // defaultSortFieldId={defaultSortFieldId}
              // defaultSortAsc={defaultSortAsc}
              noDataComponent={
                <div>
                  <span>{emptyText}</span>
                </div>
              }
              // onSort={onSort}
              // customStyles={{
              //   headCells: {
                  // style: {
                  //   maxWidth: 30,
                  // },
              //   },
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
