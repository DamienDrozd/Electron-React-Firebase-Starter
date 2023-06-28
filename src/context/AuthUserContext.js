import { createContext, useContext } from 'react'
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';

const authUserContext = createContext({
  user: null,
  loading: true,
  loginWithPassword: () => { },
  logout: () => { },
  isLogged: false,
});

export const AuthUserProvider = ({ children }) => {
  const context = useFirebaseAuth();
  return <authUserContext.Provider value={context}>{children}</authUserContext.Provider>;
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
