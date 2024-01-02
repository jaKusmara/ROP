import { useProjectContext } from "./useContext/useProjectContext";
import axios from "axios";
import { useState } from "react";

export const useProject = () => {
  const { state, dispatch } = useProjectContext();
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
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const setProject = async (user, _id) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/project/getProjectById?_id=${_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "SET_PROJECT", payload: response.data });
        localStorage.setItem(
          "board_id",
          JSON.stringify(response.data.board_id)
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const createProject = async (user, title) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/project/createProject`,
        { title: title },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "CREATE_PROJECT", payload: response.data });
        console.log(response);
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
      const response = await axios.get(
        `http://localhost:5000/api/project/getProjectById?_id=${_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "SET_PROJECT", payload: response.data });
        localStorage.setItem(
          "board_id",
          JSON.stringify(response.data.board_id)
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  return { setProjects, setProject, createProject, error, isLoading };
};
