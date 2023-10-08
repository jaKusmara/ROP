import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

function RegistrationForm() {
  const { signup, error, isLoading} = useSignup()

  const [user, setUser] = useState({
    firstname: '',
    surname: '',
    email: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    await signup(user)
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={user.firstname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={user.surname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
        />
        <button disabled={isLoading} type="submit">Register</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default RegistrationForm;
