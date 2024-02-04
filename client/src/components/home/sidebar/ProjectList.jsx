import { useEffect, useState } from "react";
import { useProjectContext } from "../../../hooks/useContext/useProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useProject } from "../../../hooks/useProject";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useBoardContext } from "../../../hooks/useContext/useBoardContext";

import { List, ListItem } from "@material-tailwind/react";

export default function ProjectList() {
  const { user } = useAuthContext();
  const { dispatch: listContextDisp } = useBoardContext();
  const { state: idContext, dispatch } = useIdContext();
  const { setProject } = useProject();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();
  const { project_id } = useParams();
  const navigate = useNavigate();

  

  return (
    <>
      <List className="">
        {projectState.projects &&
          projectState.projects.map((project) => (
            <ListItem
              key={project._id}
              onClick={() => {
                navigate(`/project/${project._id}`);
                listContextDisp({ type: "SET_LISTS", payload: [] });
                listContextDisp({ type: "TASKS_LISTS", payload: [] });
                listContextDisp({ type: "SET_PARTICIPANTS", payload: [] });
              }}
            >
              {project.title}
            </ListItem>
          ))}
      </List>
    </>
  );
}
