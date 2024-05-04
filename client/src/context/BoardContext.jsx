import { createContext, useReducer } from "react";

export const BoardContext = createContext();

export const boardReducer = (state, action) => {
  switch (action.type) {
    case "SET_LISTS": {
      return { ...state, lists: action.payload };
    }
    case "CREATE_LIST": {
      return { ...state, lists: [...state.lists, action.payload] };
    }
    case "SET_TASKS": {
      return { ...state, tasks: action.payload };
    }
    case "CREATE_TASK": {
      return { ...state, tasks: [...state.tasks, action.payload] };
    }
    case "SET_TASK": {
      return { ...state, task: action.payload };
    }
    case "SET_COUNTEDTASK": {
      return { ...state, countedTasks: action.payload };
    }
    case "SET_PARTICIPANTS": {
      return { ...state, participants: action.payload };
    }

    case "ADD_LABEL": {
      const updatedTask = {
        ...state.task,
        labels: [...state.task.labels, action.payload],
      };

      return { ...state, task: updatedTask };
    }

    case "DELETE_LABEL": {
      const updatedTask = {
        ...state.task,
        labels: state.task.labels.filter(
          (label) => label._id !== action.payload
        ),
      };

      return { ...state, task: updatedTask };
    }

    case "MOVE_TASK": {
      const { taskId, newListId } = action.payload;
      
      const updatedTasks = state.tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, list_id: newListId }; 
        }
        return task;
      });
    
      return { ...state, tasks: updatedTasks };
    }

    default:
      return state;
  }
};
export const BoardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, {
    lists: [],
    tasks: [],
    task: null,
    participants: [],
    countedTasks: null,
  });

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
