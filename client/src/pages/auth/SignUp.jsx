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
  const [avatar, setAvatar] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(
      firstname,
      surname,
      email,
      username,
      password,
      reTypePassword,
      avatar
    );
  };

  return (
    <div className="flex flex-col items-center gap-y-8 ">
      <h2 className="text-7xl font-bold">Sign Up</h2>
      <div className="flex flex-wrap justify-center w-3/5 h-fit gap-y-3 gap-x-3 text-black">
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
      <div className="grid grid-rows-2 grid-cols-3 w-3/5 justify-items-center">
        <img
          src="b1.png"
          alt="avatar"
          className={`w-1/2 p-2 cursor-pointer ${
            avatar === "b1.png" ? "selected-avatar" : ""
          }`}
          onClick={() => setAvatar("b1.png")}
        />
        <img
          src="b2.png"
          alt="avatar"
          className={`w-1/2 p-2 cursor-pointer ${
            avatar === "b2.png" ? "selected-avatar" : ""
          }`}
          onClick={() => setAvatar("b2.png")}
        />
        <img
          src="b3.png"
          alt="avatar"
          className={`w-1/2 p-2 cursor-pointer ${
            avatar === "b3.png" ? "selected-avatar" : ""
          }`}
          onClick={() => setAvatar("b3.png")}
        />
        <img
          src="w1.png"
          alt="avatar"
          className={`w-1/2 p-2 cursor-pointer ${
            avatar === "w1.png" ? "selected-avatar" : ""
          }`}
          onClick={() => setAvatar("w1.png")}
        />
        <img
          src="w2.png"
          alt="avatar"
          className={`w-1/2 p-2 cursor-pointer ${
            avatar === "w2.png" ? "selected-avatar" : ""
          }`}
          onClick={() => setAvatar("w2.png")}
        />
        <img
          src="w3.png"
          alt="avatar"
          className={`w-1/2 p-2 cursor-pointer ${
            avatar === "w3.png" ? "selected-avatar" : ""
          }`}
          onClick={() => setAvatar("w3.png")}
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
          className="bg-indigo-900 self-end rounded-md w-1/3 text-2xl h-12 hover:bg-green-400"
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
