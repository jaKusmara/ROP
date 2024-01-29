import axios from "axios";
import { useBoardContext } from "./useContext/useBoardContext";
import { useState } from "react";
import socket from "../utils/socekt";

export const useBoard = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useBoardContext();

  const createList = async (user, title, board_id) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/list/createList?board_id=${board_id}`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "CREATE_LIST", payload: response.data.data });
        setIsLoading(false);

        socket.emit("tasks_refresh", {
          to: board_id,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error("List creation failed:", error);
    }
  };

  const setLists = async (user, board_id) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/list/getLists?board_id=${board_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "SET_LISTS", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const deleteList = async (user, list_id, board_id) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/list/deleteList?list_id=${list_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        console.log(response);
        socket.emit("tasks_refresh", {
          to: board_id,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  const editTitle = async (user, list_id, board_id, title) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/list/editTitle?list_id=${list_id}`,
        { title: title },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        console.log(response);
        socket.emit("tasks_refresh", {
          to: board_id,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  return { createList, setLists, deleteList, editTitle, error, isLoading };
};
