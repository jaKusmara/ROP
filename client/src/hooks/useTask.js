import axios from "axios";
import { useTaskContext } from "./useContext/useTaskContext";
import { useState } from "react";
import socket from "../utils/socekt";

export const useTask = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useTaskContext();

  const createTask = async (
    user,
    boardList_id,
    board_id,
    title,
    description
  ) => {
    setIsLoading(true);

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

        socket.emit("tasks_refresh", {
          to: board_id,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("Task creation failed:", error);
    }
  };

  const getTask = async (user, task_id) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/task/getTaskById?task_id=${task_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "SET_TASK", payload: response.data });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("Setting task failed:", error);
    }
  };

  const updateTask = async (user, task_id, title, description, board_id) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/updateTask?task_id=${task_id}`,
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
        setIsLoading(false);

        socket.emit("tasks_refresh", {
          to: board_id,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("Task update failed:", error);
    }
  };

  const getTaskParticipants = async (user, task_id) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/task/taskParticipants?task_id=${task_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        if (response.data.participants) {
          dispatch({
            type: "SET_PARTICIPANTS",
            payload: response.data.participants,
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("Getting participants failed:", error);
    }
  };

  const joinTask = async (user, task_id) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/joinTask?task_id=${task_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("Getting participants failed:", error);
    }
  };

  const leaveTask = async (user, task_id) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/leaveTask?task_id=${task_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("Getting participants failed:", error);
    }
  };

  const deleteTask = async (user, task_id, board_id) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/task/deleteTask?task_id=${task_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        socket.emit("tasks_refresh", {
          to: board_id,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("Getting participants failed:", error);
    }
  };

  return {
    createTask,
    getTask,
    updateTask,
    getTaskParticipants,
    deleteTask,
    leaveTask,
    joinTask,
    error,
    isLoading,
  };
};
