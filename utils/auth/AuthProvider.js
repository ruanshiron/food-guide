import React, { useState, useEffect, useContext, createContext } from "react";
import { firebase, database } from "../../config/firebaseConfig";

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const getUserRole = async (user) => {
    const snapshot = await database
      .collection("users")
      .where("uid", "==", user.uid)
      .limit(1)
      .get();
    if (snapshot.empty) {
      console.log("No such document!");
    } else {
      snapshot.forEach((doc) => {
        setRole(doc.data().role);
      });
    }
  };

  const getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
        getUserRole(user);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
