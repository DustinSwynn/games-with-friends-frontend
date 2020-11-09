import { createContext } from 'react';
import useAuthenticationContext, { AuthenticationContext } from './AuthenticationContext';


export const Context = createContext({});

export const Provider = ({ children }) => {
  
  const context = {
    auth: useAuthenticationContext()
  };

  return <Context.Provider value={context}>{children}</Context.Provider>
};

export const { Consumer } = Context;


