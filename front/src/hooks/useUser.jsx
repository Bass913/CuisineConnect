import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ajouter l'état de chargement

    const login = async (email, password) => {
        return fetch("https://cuisineconnect-9ffq.onrender.com/auth/login", {
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
            setLoading(true); // Définir loading à true au début de la récupération
            const response = await fetch(
                "https://cuisineconnect-9ffq.onrender.com/users/me",
                {
                    credentials: "include",
                }
            );
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

    const logout = () => {
        try {
            return fetch(
                "https://cuisineconnect-9ffq.onrender.com/auth/logout",
                {
                    method: "DELETE",
                    credentials: "include",
                }
            ).then(() => {
                setUser(null);
            });
        } catch (error) {
            console.log(error);
        }
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
