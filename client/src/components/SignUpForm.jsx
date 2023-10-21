import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

function RegistrationForm() {
  const { signup, error, isLoading} = useSignup()

  const [firstname, setFirstName] = useState('')
  const [surname, setSurName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [reTypePassword, setReTypePassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();

    await signup(firstname, surname, email, username, password, reTypePassword)
  }

  return (
    <div className="flex flex-col space-y-4 w-3/5">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurName(e.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="re type Password"
          value={reTypePassword}
          onChange={(e) => setReTypePassword(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={isLoading} type="submit" className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">Register</button>
        {error && <div>{error}</div>}
    </div>
  );
}

export default RegistrationForm;
