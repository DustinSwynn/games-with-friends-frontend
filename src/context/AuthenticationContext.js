import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAuthenticationContext = () => {
  const { isAuthenticated } = useAuth0();

  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setAuthenticated(true);
    }
  }, [login]);

  return {
    authenticated,
    login,
    setLogin
  };
};

export default useAuthenticationContext;