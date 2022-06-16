import { useContext, createContext } from 'react';

interface GlobalContext {
  isPatientAuthenticated: boolean;
  setIsPatientAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: GlobalContext = {
  isPatientAuthenticated: false,
  setIsPatientAuthenticated: () => {},
};

export const AppContext = createContext<GlobalContext>(defaultContext);

export function useAppContext() {
  return useContext(AppContext);
}
