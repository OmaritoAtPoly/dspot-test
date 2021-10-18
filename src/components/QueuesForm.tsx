import { makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import PinField from "react-pin-field";
import STRINGS from "../utils/STRINGS";
import Modal from "./modal/Modal";
import QueueModalContent from "./modal/QueueModalContent";

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
  },
  inputStyle: {
    paddingBottom: theme.spacing(2),
    maxWidth: theme.spacing(6),
    border: `1px solid ${theme.palette.primary.main}`,
    paddingInline: theme.spacing(.6),
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
}));

interface Props {
  queueLength: number;
  modalVisibility: boolean;
  sequential: string;
  queueValue?: string;
  problemAnswer?: string;
  handleInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onCompleteQueue: (val: string) => void;
  handleModalVisibility: () => void;
  handleAddNewQueueRecord: () => void;
}
const QueuesForm = ({
  queueLength,
  modalVisibility,
  queueValue,
  sequential,
  problemAnswer,
  handleInputValue,
  onCompleteQueue,
  handleModalVisibility,
  handleAddNewQueueRecord,
}: Props) => {
  const classes = styles();
 
  return (
    <div className={classes.root}>
      <div className={classes.formStyle}>
        <Typography className={classes.textStyle}>
          {STRINGS.queue.QUEUE_LENGTH}
        </Typography>
        <TextField className={classes.inputStyle} onChange={handleInputValue} />
      </div>
      {queueLength > 0 ? (
        <div>
          <PinField
            length={queueLength}
            autoFocus
            validate={STRINGS.queue.ALLOWED_VALUES} //only this chars are allowed in the inputs
            className={classes.pinCode}
            onComplete={onCompleteQueue}
          />
          {sequential === "false" && (
            <Typography className={classes.errorStyle}>
              {STRINGS.queue.BAD_ARRAY}
            </Typography>
          )}
        </div>
      ) : (
        <Typography>{STRINGS.queue.SET_LENGTH}</Typography>
      )}
      <Modal open={modalVisibility} handleOpen={handleModalVisibility}>
        <QueueModalContent
          cancelFn={handleModalVisibility}
          acceptFn={handleAddNewQueueRecord}
          modalTitle={queueValue}
          modalContent={problemAnswer}
        />
      </Modal>
    </div>
  );
};

export default QueuesForm;
