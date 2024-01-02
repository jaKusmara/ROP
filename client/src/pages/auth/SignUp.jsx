import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const { signup, error, isLoading } = useSignup();

  const [firstname, setFirstName] = useState("");
  const [surname, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(firstname, surname, email, username, password, reTypePassword);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2>Registration...</h2>
      <div className="flex flex-wrap gap-x-[2%] gap-y-4 justify-center">
        <input
          className="flex bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500  w-[45%] h- p-2.5 checked:bg-emerald-500"
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="flex bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500  w-[45%] p-2.5 checked:bg-emerald-500"
          type="text"
          name="surname"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurName(e.target.value)}
        />

        <input
          className="flex bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500  w-[92%] p-2.5 checked:bg-emerald-500"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="flex bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500  w-[92%] p-2.5 checked:bg-emerald-500"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="flex bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500  w-[45%] p-2.5 checked:bg-emerald-500"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="flex bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500  w-[45%] p-2.5 checked:bg-emerald-500"
          type="password"
          name="password"
          placeholder="re type Password"
          value={reTypePassword}
          onChange={(e) => setReTypePassword(e.target.value)}
        />
      </div>
      <div className="flex items-center w-full justify-center mt-4">
        <div className="w-1/2 text-red-700">{error && <p>{error}</p>}</div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            type="submit"
            className=" w-[40%] p-2.5 text-white bg-black flex items-center justify-center rounded-xl hover:bg-emerald-600"
          >
            Register
          </button>
      </div>
      <div className="flex w-full flex-row-reverse p-4">
      <Link to={`/login`}>
      <p className="text-indigo-700">Do you have an account?</p>
      </Link>
      </div>
    </div>
  );
}

export default RegistrationForm;
