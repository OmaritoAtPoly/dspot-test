import React, { useContext, useMemo } from "react";
import { QueueAppContext } from "../App";
import Table from "../components/table/Table";
import { useColumns } from "../hooks/useColumns";
import STRINGS from "../utils/STRINGS";

const HomeContainer = () => {

  const onDelete = (queueId: string ) => () => {console.log("queueIdqueueIdqueueId", queueId)};
  const onEdit = (queueId: string ) => () => {console.log("onEditonEdit", queueId)};

  const columns = useColumns(onDelete, onEdit);
  const { queueData } = useContext(QueueAppContext);

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

  return <Table columns={columns} data={preparedData} emptyText={STRINGS.queue.NO_DATA} />;
};

export default HomeContainer;

