import axios from "axios";
import { useAuthContext } from "./useContext/useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (
    firstname,
    surname,
    email,
    username,
    password,
    reTypePassword
  ) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        { firstname, surname, email, username, password, reTypePassword }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));

        setIsLoading(false);
        dispatch({ type: "LOGIN", payload: response.data });
        console.log("Registered successfully:", response.data);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data);
      console.error("Registration failed:", error.response.data);
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
