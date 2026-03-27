/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export  const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

