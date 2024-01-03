import axios from "axios";
import { useListContext } from "./useContext/useListContext";
import { useState } from "react";
import socket from "../utils/socekt";

export const useList = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useListContext();

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
        dispatch({ type: "SET_LISTS", payload: response.data.listsAndTasks });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  return { createList, setLists, error, isLoading };
};