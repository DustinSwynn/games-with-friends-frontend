import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import { postLogin } from '../clientAPIs/login';
import { Context as GlobalContext } from '../context/GlobalContext';
import createAuth0Client from '@auth0/auth0-spa-js';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const { 
    auth: {
      authenticated,
      login,
      setLogin
    }
  } = useContext(GlobalContext);

  const handleOnClick = () => {
    loginWithRedirect()
  };

  return (
    <Button 
      variant="contained"
      color="primary"
      onClick={() => handleOnClick()}
    >
      Log In
    </Button>
  );
};

export default LoginButton;