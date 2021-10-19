import * as Yup from "yup";
import STRINGS from "../../utils/STRINGS";

const queuesValidationSchema = () => (
  Yup.object({
    queueInputValue: Yup
      .number()
      .min(1, STRINGS.yup.QUEUE_RANGE)
      .max(9, STRINGS.yup.QUEUE_RANGE),
  })
);
export default queuesValidationSchema;
