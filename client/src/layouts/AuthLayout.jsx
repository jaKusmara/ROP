import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="flex w-3/5 bg-slate-500"></div>
      <div className="w-2/5 bg-slate-600 content-center">
        <Outlet />
      </div>
    </>
  );
}
