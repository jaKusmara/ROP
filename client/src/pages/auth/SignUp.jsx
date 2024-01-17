import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const { signup, error, isLoading } = useSignup();

  const navigate = useNavigate();

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
    <div className="flex flex-col items-center gap-y-8">
      <h2 className="text-7xl font-bold">Sign Up</h2>
      <div className="flex flex-wrap justify-center w-3/5 h-fit gap-y-3 gap-x-3">
        <input
          className="h-14 w-2/5 rounded-md text-3xl "
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="h-14 w-2/5 rounded-md text-3xl "
          type="text"
          name="surname"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurName(e.target.value)}
        />

        <input
          className="h-14 w-5/6 rounded-md text-3xl "
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="h-14 w-5/6 rounded-md text-3xl "
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="h-14 w-2/5 rounded-md text-3xl "
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="h-14 w-2/5 rounded-md text-3xl "
          type="password"
          name="password"
          placeholder="re type Password"
          value={reTypePassword}
          onChange={(e) => setReTypePassword(e.target.value)}
        />
      </div>
      <span className="flex flex-col w-3/5 gap-y-2">
        <div className="flex text-red-600 text-xl">
          {error && <p>{error.error}</p>}
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          type="submit"
          className="bg-indigo-900 self-end rounded-md w-1/3 text-2xl h-14 hover:bg-green-400"
        >
          Register
        </button>
        <p
          onClick={() => {
            navigate("../login");
          }}
          className="self-end text-xl text-blue-900"
        >
          Do you have an account?
        </p>
      </span>
    </div>
  );
}

export default RegistrationForm;
