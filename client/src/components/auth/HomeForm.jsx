import { useNavigate } from "react-router-dom";

export default function HomeForm() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-y-10">
      <h2 className="text-7xl font-bold">Get Started</h2>
      <div className="flex flex-col items-center w-[80%] h-fit gap-y-3">
        <button
          onClick={() => {
            navigate("login");
          }}
          className="bg-indigo-900 h-12 w-[50%] rounded-md text-3xl"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate("signup");
          }}
          className="bg-indigo-900 h-12 w-[50%] rounded-md text-3xl"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
