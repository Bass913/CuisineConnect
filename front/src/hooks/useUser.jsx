import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

// 2. Créer un Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = async (email, password) => {
    return fetch("http://localhost:3000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(async (response) => {
      await getUserInfo();
      return response;
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/me", {
        credentials: "include",
      });
      const userData = await response.json();
      setUser(userData);
      if (!response.ok) {
        throw new Error("Something went wrong, request failed!");
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, getUserInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Utiliser le contexte
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
