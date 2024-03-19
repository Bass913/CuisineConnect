import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

// 2. Créer un Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: userData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
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
