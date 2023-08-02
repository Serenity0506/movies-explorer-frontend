import { useState } from 'react';
import { Context } from './utils/Session/index'


export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <Context.Provider value={[currentUser, setCurrentUser, loading, setLoading]}>
      {children}
    </Context.Provider>
  )


}