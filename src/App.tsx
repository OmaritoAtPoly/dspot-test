import React, { createContext } from "react";
import { defaultQueuesElements } from "./appStore/store";
import Routes from "./routes/Routes";
import { QueueElementsType } from "./utils/types.d";

export const QueueAppContext = createContext({
  queueData: defaultQueuesElements,
  handleQueuesValue: (val: QueueElementsType[]) => {},
});

const App = () => {
  const [queueData, setQueueData] = React.useState<QueueElementsType[]>(defaultQueuesElements);

  const handleQueuesValue = (val: QueueElementsType[]) => {
    setQueueData(val);
  };

  return (
    <QueueAppContext.Provider value={{ queueData, handleQueuesValue }}>
      <Routes />
    </QueueAppContext.Provider>
  );
};

export default App;
