import axios from "axios";
import { useSearchContext } from "./useContext/useSearchContext";
import { useState } from "react";

export const useSearch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, dispatch } = useSearchContext();

  const search = async (user, query) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/search/?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        dispatch({ type: "SET_QUERY", payload: response.data });
      }
    } catch (error) {
      setError(error.response.data);
      console.error("Registration failed:", error.response.data);
      setIsLoading(false);
    }
  };

  return { search, error, isLoading };
};
