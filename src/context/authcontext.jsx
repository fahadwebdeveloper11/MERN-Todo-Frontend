import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  loading: true,
  refresh: false,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        setLoading,
        loading,
        user,
        setUser,
        refresh,
        setRefresh
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
