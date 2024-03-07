import { createContext, useState } from "react";

export const ShowFormContext = createContext();

export const ShowFormContextProvider = ({ children }) => {
  const [task, setTask] = useState(false);

  return (
    <ShowFormContext.Provider
      value={{
        task,
        setTask,
      }}
    >
      {children}
    </ShowFormContext.Provider>
  );
};
