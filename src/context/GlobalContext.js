import { createContext } from 'react';
import useAuthenticationContext from './AuthenticationContext';
import useCodenamesContext from './CodenamesContext';

export const Context = createContext({});

export const Provider = ({ children }) => {
  
  const context = {
    auth: useAuthenticationContext(),
    codenames: useCodenamesContext()
  };

  return <Context.Provider value={context}>{children}</Context.Provider>
};

export const { Consumer } = Context;


