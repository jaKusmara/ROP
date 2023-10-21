import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const { login, error, isLoading } = useLogin();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(identifier, password);
  };

  return (
    <div className="flex flex-col space-y-4 w-3/5">
      <div className="form flex flex-col space-y-4">
        <input
          className="h-10 rounded"
          type="text"
          name="identifier"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          className="h-10 rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-bottom flex justify-between items-center">
        {error && <div className="text-red-500">{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          type="submit"
          className="w-1/3 bg-black h-10 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00089b] before:to-[rgb(105,155,184)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
