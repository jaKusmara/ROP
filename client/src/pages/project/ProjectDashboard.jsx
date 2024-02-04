import { useBoardContext } from "../../hooks/useContext/useBoardContext";
import { useProjectContext } from "../../hooks/useContext/useProjectContext";

import UserTable from "../../components/project/board/UserTable";
import DoughnutChart from "../../components/chart/DoughnutChart";
export default function ProjectDashboard() {
  const { state: boardState } = useBoardContext();
  const { state: projectState } = useProjectContext();

  console.log(boardState);

  const chartData = {
    labels: boardState.lists.map((list) => list.title),
    values: boardState.lists.map((list) => list.tasks.length),
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#FF8E56", "#FGCE56"],
  };
  console.log(projectState.project);
  return (
    <>
      <div className="flex w-full h-1/2 mb-4">
        <div className="flex flex-col w-full">
          {projectState.project && (
            <h2 className="text-5xl">{projectState.project.title}</h2>
          )}
          <span className="p-2">project description</span>

          {/*  {projectState.project.description && projectState.project.description} */}
        </div>
        <div className="max-h-full bg-zinc-800 w-1/2 rounded p-3">
          <DoughnutChart data={chartData} />
        </div>
      </div>
      <section>
        <nav>Members</nav>
        <div></div>
      </section>
    </>
  );
}
