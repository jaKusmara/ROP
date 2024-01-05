import { IdContext } from "../../context/IdContext";
import { useContext } from "react";

export const useIdContext = () => {
  const context = useContext(IdContext);

  if (!context) {
    throw Error("useIdContext must be used inside an IdContextProvider");
  }

  return context;
};
