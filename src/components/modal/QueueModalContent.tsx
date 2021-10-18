import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import STRINGS from "../../utils/STRINGS";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroupStyle: {
      display: "flex",
      justifyContent: "space-evenly",
    },
  })
);

interface Props {
    modalTitle?: string, 
    modalContent?: string,
    cancelFn: () => void;
    acceptFn: () => void;
}

const QueueModalContent = ({modalTitle = "", modalContent = "", cancelFn, acceptFn}: Props) => {
    const classes = useStyles();

  return (
    <div>
      <h2>{modalTitle}</h2>
      <p>{modalContent}</p>
      <span className={classes.buttonGroupStyle}>
      <Button onClick={cancelFn} color="secondary" variant="outlined">{STRINGS.general.CANCEL}</Button>
      <Button onClick={acceptFn} color="primary" variant="outlined">{STRINGS.general.ACCEPT}</Button>
      </span>
    </div>
  );
};

export default QueueModalContent;
