import { createContext, useState } from "react";

export const ShowFormContext = createContext();

export const ShowFormContextProvider = ({ children }) => {
  const [background, setBackground] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [createList, setCreateList] = useState(false);
  const [createProject, setCreateProject] = useState(false);
  const [joinProject, setJoinProject] = useState(false);

  return (
    <ShowFormContext.Provider
      value={{
        background,
        setBackground,
        createTask,
        setCreateTask,
        createList,
        setCreateList,
        createProject,
        setCreateProject,
        joinProject,
        setJoinProject,
      }}
    >
      {children}
    </ShowFormContext.Provider>
  );
};
