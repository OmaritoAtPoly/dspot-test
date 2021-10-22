import { render, screen } from "@testing-library/react";
import { QueueElementsType } from "../utils/types.d";
import { nanoid } from "nanoid";
import moment from "moment";
import { RowRecord, TableColumn } from "react-data-table-component";
import HomeForm from "../components/home/HomeForm";

describe("Rendering main page with data on a table", () => {
  let preparedData: QueueElementsType[] = [
    {
      id: nanoid(4),
      createdAt: moment().format("hh:mm:s A").toString(),
      currentQueueSolution: 0,
      queueArray: [1, 2, 3],
    },
  ];

  const handleDeleteModalOpen = jest.fn();
  const handleDeleteQueue = jest.fn();
  const handleEditModalOpen = jest.fn();
  const onCompleteQueue = jest.fn();

  let columns: TableColumn<RowRecord>[];
  
  test("rendering a table with data on in", () => {
    render(
      <HomeForm
        columns={columns}
        preparedData={preparedData}
        handleDeleteModalOpen={handleDeleteModalOpen}
        handleDeleteQueue={handleDeleteQueue}
        handleEditModalOpen={handleEditModalOpen}
        isDeleteModalOpen={false}
        isEditModalOpen={false}
        onCompleteQueue={onCompleteQueue}
        sequentialTruthy={"true"}
      />
    );

    const table = screen.getByRole("table");
    const rowGroup = screen.getAllByRole("rowgroup");

    expect(table).toBeDefined()
    expect(rowGroup).toBeDefined()
  });
});
