import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Ajouter l'état de chargement

  const login = async (email, password) => {
    // Logique de connexion
  };

  const getUserInfo = async () => {
    try {
      setLoading(true); // Définir loading à true au début de la récupération
      const response = await fetch("http://localhost:3000/users/me", {
        credentials: "include",
      });
      const userData = await response.json();
      setUser(userData);
      setLoading(false); // Définir loading à false une fois les données récupérées
      if (!response.ok) {
        throw new Error("Something went wrong, request failed!");
      }
    } catch (err) {
      console.log(err);
      setUser(null);
      setLoading(false); // Définir loading à false en cas d'erreur
    }
  };

  const logout = async () => {
    // Logique de déconnexion
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, getUserInfo, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
