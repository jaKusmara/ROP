import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, error } = useLogin();

  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(identifier, password);
  };
  return (
    <div className="flex flex-col items-center gap-y-8">
      <h2 className="text-7xl font-bold">Login</h2>
      <div className="flex flex-col items-center text-black sm:w-3/5 h-fit gap-y-3">
        <input
          className="w-full rounded-md text-3xl sm:h-10 sm:p-2"
          type="text"
          name="identifier"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          className="w-full rounded-md text-3xl sm:h-10 sm:p-2"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <span className="flex flex-col w-3/5 gap-y-2">
        <p className="flex text-red-600 text-xl">
          {error && <p>{error.error}</p>}
        </p>
        <button
          className="bg-indigo-900 self-end rounded-md w-1/3 text-2xl h-12 hover:bg-green-400"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>

        <p
          onClick={() => {
            navigate("../signup");
          }}
          className="self-end text-xl text-blue-900"
        >
          Don't have an account?
        </p>
      </span>
    </div>
  );
}
