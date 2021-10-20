import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import STRINGS from "../../utils/STRINGS";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroupStyle: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    labelGroupStyle: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: theme.spacing(1),
      alignItems: "center",
    },
  })
);

interface Props {
  modalTitle?: string;
  modalContent?: string;
  cancelFn: () => void;
  acceptFn: () => void;
}

const AuxillaryContentComponent = ({
  modalTitle = "",
  modalContent = "",
  cancelFn,
  acceptFn,
}: Props) => {
  const classes = useStyles();

  return (
    <div>
      <span className={classes.labelGroupStyle}>
        <h4>{modalTitle}</h4>
        <p>{modalContent}</p>
      </span>
      <span className={classes.buttonGroupStyle}>
        <Button onClick={cancelFn} color="secondary" variant="outlined">
          {STRINGS.general.CANCEL}
        </Button>
        <Button onClick={acceptFn} color="primary" variant="outlined">
          {STRINGS.general.ACCEPT}
        </Button>
      </span>
    </div>
  );
};

export default AuxillaryContentComponent;
