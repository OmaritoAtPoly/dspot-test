import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  titleEdit: string;
  titleDelete: string;
  OnEdit: () => void;
  onDelete: () => void;
}

const ActionButton = ({
  OnEdit,
  titleEdit,
  titleDelete,
  onDelete,
}: Props) => (
  <>
    <IconButton title={titleEdit} onClick={OnEdit}>
       <EditIcon/>
    </IconButton>
    
     <IconButton onClick={onDelete} title={titleDelete}>
        <DeleteIcon  />
      </IconButton>
  </>
);

export default ActionButton;
