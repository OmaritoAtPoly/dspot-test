import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import STRINGS from "../../utils/STRINGS";
import PinField from "react-pin-field";

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
    spanPinWrapperStyle: {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
},
  })
);

interface Props {
  modalTitle?: string;
  modalContent?: string;
  withButtonElements?: boolean;
  queueLength?: number;
  sequentialTruthy?: string;
  cancelFn: () => void;
  acceptFn: () => void;
  onCompleteQueue?: (val: string) => void;
}

const AuxillaryContentComponent = ({
  modalTitle = "",
  modalContent = "",
  withButtonElements = true,
  sequentialTruthy = "",
  queueLength,
  cancelFn,
  acceptFn,
  onCompleteQueue = () => {},
}: Props) => {
  const classes = useStyles();

  return (
    <div>
      <span className={classes.labelGroupStyle}>
        <h4>{modalTitle}</h4>
        <p>{modalContent}</p>
      </span>
      {withButtonElements ? (
        <span className={classes.buttonGroupStyle}>
          <Button onClick={cancelFn} color="secondary" variant="outlined">
            {STRINGS.general.CANCEL}
          </Button>
          <Button onClick={acceptFn} color="primary" variant="outlined">
            {STRINGS.general.ACCEPT}
          </Button>
        </span>
      ) : (
        <span className={classes.spanPinWrapperStyle}>
          <PinField
            length={queueLength}
            autoFocus
            validate={STRINGS.queue.ALLOWED_VALUES} //only this chars are allowed in the inputs
            className={classes.pinCode}
            onComplete={onCompleteQueue}
          />
          {sequentialTruthy === "false" && (
            <Typography className={classes.errorStyle}>
              {STRINGS.queue.BAD_ARRAY}
            </Typography>
          )}
          <Button onClick={cancelFn} color="secondary" variant="outlined">
            {STRINGS.general.CANCEL}
          </Button>
        </span>
      )}
    </div>
  );
};

export default AuxillaryContentComponent;
