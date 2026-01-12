import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  // 💾 Guardar token
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  // 🔐 Verificar usuario con token
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return;
    }

    axios
      .get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(response.data);
        setAuthError(null);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
        setAuthError("Sesión inválida o expirada");
        localStorage.removeItem("authToken");
      });
  };

  // 🚪 Logout
  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  // 🔁 Verificar sesión al cargar la app
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
