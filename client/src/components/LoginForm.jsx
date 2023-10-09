import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

import NavBar from './NavBar';

function LoginForm() {
  const { login, error, isLoading } = useLogin();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(identifier, password);
  };

  return (
    <div>
      <NavBar/>
      
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="identifier"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={isLoading} type="submit">
          Login
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
