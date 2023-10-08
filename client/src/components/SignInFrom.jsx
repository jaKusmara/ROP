import { useState } from 'react';
import { useSignin } from '../hooks/useSignin';

import NavBar from './NavBar';

function LoginForm() {
  const { signin, error, isLoading } = useSignin();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signin(identifier, password);
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
