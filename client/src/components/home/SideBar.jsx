import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";

import ModalDialogComponent from "./sidebar/CreateProject";
import ProjectList from "./sidebar/ProjectList";

import TextField from "@mui/material/TextField";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MessageIcon from "@mui/icons-material/Message";
import Home from "@mui/icons-material/Home";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";

export default function SideBar() {
  const { user } = useAuthContext();
  return (
    <>
      <h2>Tasking</h2>
      <hr />
      <TextField id="filled-basic" label="Search..." variant="filled" />
      <List>
        <NavLink to={"/"}>
          <ListItem>
            <ListItemButton color="primary">
              <ListItemDecorator>
                <Home />
              </ListItemDecorator>
              <ListItemContent>Home</ListItemContent>
              <KeyboardArrowRight />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to={"messages"}>
          <ListItem>
            <ListItemButton color="primary">
              <ListItemDecorator>
                <MessageIcon />
              </ListItemDecorator>
              <ListItemContent>Messages</ListItemContent>
              <KeyboardArrowRight />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
      <hr />
      <ProjectList />
      <hr />
      <List sx={{ maxWidth: 350 }}>
        <ListItem endAction={<Avatar />}>
          <ListItemButton color="primary">
            <ListItemContent>{user.user.firstname} {user.user.surname}</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
