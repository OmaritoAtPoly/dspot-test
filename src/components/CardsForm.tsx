import { Typography, Link, makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import STRINGS from "../utils/STRINGS";

interface Props {
    problemResult: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
        textDecoration: "none",
        color: theme.palette.info.main,
        fontSize: theme.spacing(2),
        margin: theme.spacing(2),
        "&:hover": {
          color: theme.palette.primary.main,
          borderBottom: "1px solid white",
        },
      },
  })
);

const CardsForm = ({problemResult}: Props) => {
  const classes = useStyles();

    return (
        <>
            <Typography className={classes.link}>
                According to <Link href={STRINGS.cards.ONLINE_CARDS_SOURCE} target="_blank">this </Link>source, the problem solution is: {problemResult}
            </Typography>
        </>
    );
};

export default CardsForm;
