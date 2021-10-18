export type Cards = {
    suit: string,
    value: string | number,
  };

  export type QueueElementsType = {
      queueId: string,
      createdAt: string,
      queueArray: number[],
      currentQueueSolution: number | string;
  }