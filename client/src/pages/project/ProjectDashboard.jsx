import { useBoardContext } from "../../hooks/useContext/useBoardContext";

import DoughnutChart from "../../components/chart/DoughnutChart";
export default function ProjectDashboard() {
  const { state: boardState } = useBoardContext();

  console.log(boardState);

  const chartData = {
    labels: boardState.lists.map((list) => list.title),
    values: boardState.lists.map((list) => list.tasks.length),
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#FF8E56", "#FGCE56"],
  };

  return (
    <>
      <DoughnutChart data={chartData} />
    </>
  );
}
