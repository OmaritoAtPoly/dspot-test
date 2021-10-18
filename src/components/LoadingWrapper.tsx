import { CircularProgress, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme: Theme) => ({
  progressButtonContainer: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    position: "relative",
  },
}));

interface Props {
  children: JSX.Element;
  loading?: boolean;
  progressSize?: number;
  classNameContainer?: string;
}

export default function LoadingWrapper({
  children,
  loading = false,
  progressSize = 24,
  classNameContainer,
}: Props) {
  const classes = styles();
  return (
    <div className={`${classes.wrapper} ${classNameContainer}`}>
      {children}
      {loading && (
        <CircularProgress
          size={progressSize}
          className={classes.progressButtonContainer}
        />
      )}
    </div>
  );
}
