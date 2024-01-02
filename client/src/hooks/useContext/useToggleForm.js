import { ShowFormContext } from "../../context/ShowFormContext";
import { useContext } from "react";

export const useToggleFormContext = () => {
  const context = useContext(ShowFormContext);

  if (!context) {
    throw Error(
      "useShowFormContext must be used inside an ShowFormContextProvider"
    );
  }

  return context;
};
