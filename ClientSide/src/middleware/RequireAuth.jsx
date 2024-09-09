import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { returnTo: window.location.pathname } // Save the current route
        });
      }
    };

    checkAuth();
  }, [isAuthenticated, loginWithRedirect, navigate]);

  // If not authenticated, don't render the protected content
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the children
  return children;
};

export default RequireAuth;
