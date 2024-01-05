import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex w-3/5 bg-slate-500"></div>
      <div className="flex flex-col w-2/5 bg-slate-600">
        <Outlet />
      </div>
    </div>
  );
}
