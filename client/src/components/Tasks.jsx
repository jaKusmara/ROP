import TaskCard from "./TaskCard";

export default function Tasks({ projectTasks, onCreateTask, getTasks }) {

  const handleCreateAndUpdateTasks = () => {
    getTasks();
    onCreateTask()
  }

  const listTask = projectTasks.map((task) => {
    <div key={task._id}>{task.title}</div>
  })

  return (
    <div className="flex flex-col w-4/5 h-full px-4 bg-slate-300">
      <button onClick={handleCreateAndUpdateTasks} className="w-[9%] bg-slate-400">
        Create Task
      </button>
      <div className="flex flex-col gap-y-3 h-full p-4">
      {listTask}
      </div>
    </div>
  );
}
