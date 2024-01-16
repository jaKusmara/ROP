import axios from "axios";
import { useAuthContext } from "./useContext/useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (identifier, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { identifier, password }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));

        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
        navigate("/");
        console.log("Login successfully:", response.data);
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setError(error.response.data);
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
