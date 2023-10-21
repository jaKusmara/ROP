import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { useState } from 'react';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const { dispatch } = useAuthContext();

  const signup = async (firstname, surname, email, username, password, reTypePassword) => {
    setIsLoading(true); 

    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', {firstname, surname, email, username, password, reTypePassword});

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));

        
        setIsLoading(false);
        dispatch({ type: 'LOGIN', payload: response.data });
        console.log('Registered successfully:', response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
      
      console.error('Registration failed:', error.response.data.error);
    }
  };

  return { signup, error, isLoading }; 
};
