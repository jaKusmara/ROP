import { useTaskContext } from "../hooks/useContext/useTaskContext";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useTask } from "../hooks/useTask";

export default function Task() {
  const { state } = useTaskContext();
  const { background, setBackground, showTask, setShowTask } = useToggleFormContext();
  const { isLoading, error } = useTask();

  console.log(state.task);

  const handleOnCancelClick = () => {
    setBackground(!background);
    setShowTask(!showTask);
  };

  return (
    <div className="felx felx-col h-96 w-96 bg-gray-600 break-all">
      {isLoading && <div>loding...</div>}
      {error && error}
      {state.task && (
        <div>
          <h2>{state.task.title}</h2>
          <div>{state.task.description}</div>
        </div>
      )}
      <button onClick={handleOnCancelClick}>Cancel</button>
    </div>
  );
}
