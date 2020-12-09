import React, { useState, useEffect, useContext, createContext } from "react";
import { firebase } from "../../config/firebaseConfig";

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};