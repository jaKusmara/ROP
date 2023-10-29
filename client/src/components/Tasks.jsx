import TaskCard from "./TaskCard";

export default function Tasks({ projectTasks, onCreateTask, onShowTask }) {

  return (
    <div className="flex flex-col w-4/5 h-full px-4 bg-slate-300">
      <button
        onClick={onCreateTask}
        className="w-[9%] bg-slate-400"
      >
        Create Task
      </button>
      <div className="flex flex-col gap-y-3 h-full p-4">
      {projectTasks.map((task) => {
  return <TaskCard onClick={onShowTask} key={task._id} task={task} />;
})}

      </div>
    </div>
  );
}
