import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

function RegistrationForm() {
  const { signup, error, isLoading} = useSignup()

  const [firstname, setFirstName] = useState('')
  const [surname, setSurName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();

    await signup(firstname, surname, email, username, password)
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
        <button disabled={isLoading} type="submit">Register</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default RegistrationForm;
