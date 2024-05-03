import { useProjectContext } from "./useContext/useProjectContext";
import { useIdContext } from "./useContext/useIdContext";
import axios from "axios";
import { useState } from "react";
import { useLogout } from "./useLogout";

export const useProject = () => {
  const { logout } = useLogout();
  const { dispatch, state: projectState } = useProjectContext();
  const { dispatch: idDispatch } = useIdContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setProjects = async (user) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/project/getAllUserProjects`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "SET_PROJECTS", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response.data.error === "Request is not authorized") {
        logout();
      }
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const setProject = async (user, project_id) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/project/getProjectById?_id=${project_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {

        console.log(response.data)

        dispatch({ type: "SET_PROJECT", payload: response.data });

        idDispatch({ type: "SET_BOARD_ID", payload: response.data.board_id });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const createProject = async (user, title, description) => {
    setIsLoading(true);
    console.log(description);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/project/createProject",
        {
          title: title,
          description: description == "" ? false : description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        console.log(response);
        dispatch({ type: "CREATE_PROJECT", payload: response.data });
        console.log(projectState);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error(error);
    }
  };

  const joinProject = async (user, connectionString) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/project/joinProject?connectionString=${connectionString}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "JOIN_PROJECT", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const leaveProject = async (user, project_id) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/project/leaveProject?project_id=${project_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        //dispatch({ type: "LEAVE_PROJECT", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const deleteProject = async (user, project_id) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/project/deleteProject?project_id=${project_id}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        //dispatch({ type: "DELETE_PROJECT", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const editProjectTitle = async (user, project_id, title) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/project/editProjectTitle?project_id=${project_id}&title=${title}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "EDIT_TITLE", payload: title });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const editProjectDescription = async (user, project_id, description) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/project/editProjectDescription?project_id=${project_id}&description=${description}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({
          type: "EDIT_DESCRIPTION",
          payload: description,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  return {
    setProjects,
    setProject,
    createProject,
    joinProject,
    leaveProject,
    deleteProject,
    editProjectTitle,
    editProjectDescription,
    error,
    isLoading,
  };
};
