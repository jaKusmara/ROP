import { createContext, useReducer, useState } from "react";

export const ProjectContext = createContext();

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECT": {
      return {...state, project: action.payload };
    }
    case "SET_PROJECTS": {
      return {...state, projects: action.payload };
    }
    case "CREATE_PROJECT": {
      return {...state, projects: [...state.projects, action.payload] };
    }
    case "JOIN_PROJECT":{
      return {...state, projects: [...state.projects, action.payload] };
    }
    default:
      return state;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, {
    project: null,
    projects: [],
  });

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
