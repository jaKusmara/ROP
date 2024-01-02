import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "./useContext/useAuthContext";

export const useFetch = (url) => {
  const { user } = useAuthContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.status === 200) {
            setData(res.data)
            setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError();

        console.error("Fetch failed:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};
