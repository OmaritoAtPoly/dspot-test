import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import STRINGS from "../utils/STRINGS";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

const DrawerComponent = () => {
const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => (setOpenDrawer(!openDrawer));

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={handleOpenDrawer}
      >
        <List>
         <ListItem onClick={handleOpenDrawer}>
            <ListItemText>
              <Link to="/" className={classes.link}>{STRINGS.general.HOME}</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={handleOpenDrawer}>
            <ListItemText>
              <Link to="/queues" className={classes.link}>{STRINGS.general.QUEUES}</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={handleOpenDrawer}>
        <MenuIcon className={classes.icon}/>
      </IconButton>
    </>
  );
}
export default DrawerComponent;