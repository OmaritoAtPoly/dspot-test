import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Theme,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";
import STRINGS from "../utils/STRINGS";

const useStyles = makeStyles((theme: Theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: 1,
    cursor: "default",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: theme.spacing(2),
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h6" className={classes.logo}>
          {STRINGS.general.APP_TITLE} 
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (  
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              {STRINGS.general.HOME}
            </Link>
            <Link to="/queues" className={classes.link}>
              {STRINGS.general.QUEUES}
            </Link>
            <Link to="/cards" className={classes.link}>
              {STRINGS.general.CARDS}
            </Link>
          </div>
         )}  
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
