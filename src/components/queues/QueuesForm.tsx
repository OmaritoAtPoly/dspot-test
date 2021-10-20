import {
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import PinField from "react-pin-field";
import STRINGS from "../../utils/STRINGS";
import Modal from "../modal/Modal";
import AuxillaryContentComponent from "../modal/AuxillaryContentComponent";
import queuesValidationSchema from "./queuesValidationSchema";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
  },
  textStyle: {
    fontSize: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(3),
    alignItems: "center",
  },
  inputStyle: {
    paddingBottom: theme.spacing(2),
    maxWidth: theme.spacing(12),
    paddingInline: theme.spacing(0.6),
  },
  pinCode: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    textAlign: "center",
    border: `1px solid ${theme.palette.primary.main}`,
    outline: "none",
  },
  errorStyle: {
    color: theme.palette.secondary.main,
  },
  buttonStyle: {
    width: theme.spacing(12),
  },
  eraseIconStyle: {
    color: "red",
  },
  pinWrapperStyle: {
    display: "flex",
  },
}));

interface Props {
  queueLength: number;
  modalVisibility: boolean;
  sequentialArray: string;
  queueDashNotationValue?: string;
  problemAnswer?: string;
  handleFormValues: (val: { queueInputValue: number }) => void;
  onCompleteQueue: (val: string) => void;
  handleModalVisibility: () => void;
  handleAddNewQueueRecord: () => void;
  resetQueueLength: (value: number) => void;
}
const QueuesForm = ({
  queueLength,
  modalVisibility,
  queueDashNotationValue,
  sequentialArray,
  problemAnswer,
  handleFormValues,
  onCompleteQueue,
  handleModalVisibility,
  handleAddNewQueueRecord,
  resetQueueLength,
}: Props) => {
  const classes = styles();

  const { values, handleSubmit, handleChange, errors, setFieldValue } = useFormik({
    initialValues: {
      queueInputValue: 0,
    },
    validationSchema: queuesValidationSchema,
    onSubmit: (val) => {
      handleFormValues(val);
    },
  });

  const eraseQueue = () => {
    resetQueueLength(0)
    setFieldValue("queueInputValue", 0, true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <div className={classes.formStyle}>
          <Typography className={classes.textStyle}>
            {STRINGS.queue.QUEUE_LENGTH}
          </Typography>
          <TextField
            type="number"
            name="queueInputValue"
            required
            className={classes.inputStyle}
            onChange={handleChange}
            value={values.queueInputValue}
            error={!!(errors.queueInputValue)}
            helperText={
              errors.queueInputValue
                ? errors.queueInputValue
                : ""
            }
          />
          <Button
            className={classes.buttonStyle}
            type="submit"
            color="primary"
            variant="outlined"
          >
            {STRINGS.general.ACCEPT}
          </Button>
        </div>
        {queueLength > 0 ? (
          <div>
            <span className={classes.pinWrapperStyle}>
              <IconButton onClick={eraseQueue}>
                <DeleteIcon className={classes.eraseIconStyle} />
              </IconButton>
              <PinField
                length={queueLength}
                autoFocus
                validate={STRINGS.queue.ALLOWED_VALUES} //only this chars are allowed in the inputs
                className={classes.pinCode}
                onComplete={onCompleteQueue}
              />
            </span>
            {sequentialArray === "false" && (
              <Typography className={classes.errorStyle}>
                {STRINGS.queue.BAD_ARRAY}
              </Typography>
            )}
          </div>
        ) : (
          <Typography>{STRINGS.queue.SET_LENGTH}</Typography>
        )}
        <Modal open={modalVisibility} handleOpen={handleModalVisibility}>
          <AuxillaryContentComponent
            cancelFn={handleModalVisibility}
            acceptFn={handleAddNewQueueRecord}
            modalTitle={queueDashNotationValue}
            modalContent={problemAnswer}
          />
        </Modal>
      </div>
    </form>
  );
};

export default QueuesForm;
