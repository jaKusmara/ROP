import { useEffect, useState } from "react";
import { useProjectContext } from "../../../hooks/useContext/useProjectContext";
import { NavLink, useParams } from "react-router-dom";
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useProject } from "../../../hooks/useProject";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useBoardContext } from "../../../hooks/useContext/useBoardContext";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/joy/ListItem";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/joy/Button";

import Add from "@mui/icons-material/Add";

import CreateProject from "./CreateProject";
import JoinProject from "./JoinProject";

export default function ProjectList() {
  const { user } = useAuthContext();
  const { dispatch: listContextDisp } = useBoardContext();
  const { state: idContext, dispatch } = useIdContext();
  const { setProject } = useProject();
  const { state, dispatch: projectDispatch } = useProjectContext();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalJoin, setOpenModalJoin] = useState(false);
  const open = Boolean(anchorEl);
  const { project_id } = useParams();

  useEffect(() => {
    if (project_id) {
      dispatch({ type: "SET_PROJECT_ID", payload: project_id });
      setProject(user, project_id);
    }
  }, [project_id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    listContextDisp({ type: "SET_LISTS", payload: [] });
    listContextDisp({ type: "TASKS_LISTS", payload: [] });
    listContextDisp({ type: "SET_PARTICIPANTS", payload: [] });
  };

  return (
    <List component="nav">
      <List sx={{ maxWidth: 350 }}>
        <ListItem
          endAction={
            <IconButton
              aria-label="Add"
              size="sm"
              color="neutral"
              onClick={handleClick}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Add />
            </IconButton>
          }
        >
          <ListItemText primary="Projects" />
        </ListItem>
      </List>

      {state.projects &&
        state.projects.map((project) => (
          <NavLink key={project._id} to={`project/${project._id}`}>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 1, project)}
            >
              <ListItemText primary={project.title} />
            </ListItemButton>
          </NavLink>
        ))}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemButton
            variant="outlined"
            color="neutral"
            startDecorator={<Add />}
            onClick={() => setOpenModalCreate(true)}
          >
            New project
          </ListItemButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemButton
            variant="outlined"
            color="neutral"
            startDecorator={<Add />}
            onClick={() => setOpenModalJoin(true)}
          >
            Join Project
          </ListItemButton>
        </MenuItem>
      </Menu>
      <CreateProject
        open={openModalCreate}
        onClose={() => setOpenModalCreate(false)}
      />
      <JoinProject
        open={openModalJoin}
        onClose={() => setOpenModalJoin(false)}
      />
    </List>
  );
}
