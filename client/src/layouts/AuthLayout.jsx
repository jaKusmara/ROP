import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="flex w-3/5 bg-violet-950"></div>
      <div className="w-2/5 bg-stone-950 content-center flex flex-col justify-center">
        <Outlet />
      </div>
    </>
  );
}
