import { useEffect, useState } from "react";
import { useProjectContext } from "../../../hooks/useContext/useProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useProject } from "../../../hooks/useProject";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useBoardContext } from "../../../hooks/useContext/useBoardContext";

import { List, ListItem } from "@material-tailwind/react";

import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

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
      {projectState.projects &&
        projectState.projects.map((project) => (
          <div
            key={project._id}
            onClick={() => {
              navigate(`/project/${project._id}`);
              listContextDisp({ type: "SET_LISTS", payload: [] });
              listContextDisp({ type: "TASKS_LISTS", payload: [] });
              listContextDisp({ type: "SET_PARTICIPANTS", payload: [] });
            }}
            className="flex hover:bg-neutral-800 h-16 text-xl items-center pl-3 rounded cursor-pointer"
          >
            <Avatar {...stringAvatar(project.title)} />
            <p className="pl-4">{project.title}</p>
          </div>
        ))}
    </>
  );
}
