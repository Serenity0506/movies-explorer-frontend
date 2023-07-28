import { useContext } from 'react';
import { createContext } from 'react';


export const Context = createContext(null);

export const useSession = () => {
  return useContext(Context)
}