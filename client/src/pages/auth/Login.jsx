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
      <div className="flex flex-col items-center w-3/5 h-fit gap-y-3">
        <input
          className="h-10 w-full rounded-md text-3xl h-16"
          type="text"
          name="identifier"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          className="h-10 w-full rounded-md text-3xl h-16"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <span className="flex flex-col w-3/5 gap-y-2">
        <div className="flex text-red-600 text-xl">
          {error && <p>{error.error}</p>}
        </div>
        <button
          className="bg-indigo-900 self-end rounded-md w-1/3 text-2xl h-14 hover:bg-green-400"
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
          You don t have an account?
        </p>
      </span>
    </div>
  );
}
