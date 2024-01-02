import axios from "axios";
import { useTaskContext } from "./useContext/useTaskContext";
import { useState } from "react";

export const useTask = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useTaskContext();

  const createTask = async (user, boardList_id, title, description) => {
    setIsLoading(true);
    console.log(boardList_id);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/task/createTask?boardList_id=${boardList_id}`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "CREATE_TASK", payload: response.data });
        setIsLoading(false);

        console.log("Task created successfully:", response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("Task creation failed:", error);
    }
  };

  // const setTask = async (user, board_id) => {
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/task/getAllListTasks?board_id=${board_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );

  //     if (response.status) {
  //       dispatch({ type: "SET_TASKS", payload: response.data });
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     setError(error);

  //     console.error("Setting task failed:", error);
  //   }
  // };

  return { createTask, error, isLoading };
};
