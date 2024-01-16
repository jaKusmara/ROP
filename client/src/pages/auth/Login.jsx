import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(identifier, password);
  };
  return (
    <form className="flex flex-col max-w-xs">
      <input
        className="flex bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 w-[85%] p-2.5 checked:bg-emerald-500"
        type="text"
        name="identifier"
        placeholder="Email or Username"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        className="flex bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 w-[85%] p-2.5 checked:bg-emerald-500"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span>
        <button
          className="flex justify-end"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
        <div className="flex justify-start text-red-600">
          {error && <p>{error.error}</p>}
        </div>
      </span>
    </form>
  );
}
