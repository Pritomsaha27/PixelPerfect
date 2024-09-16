import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({});
      } else {
        // If authenticated, store user data
        await addUser(user);
      }
    };

    const addUser = async (user) => {
      try {
        await axios.post('http://localhost:5000/api/save-user', {
          name: user.name,
          email: user.email,
          auth0Id: user.sub, 
        });
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };

    checkAuth();
  }, [isAuthenticated, loginWithRedirect, navigate, user]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default RequireAuth;
