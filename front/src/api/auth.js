export const login = async (email, password) => {
    return fetch("https://cuisineconnect-9ffq.onrender.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then((response) => response);
};

export const getUserInfo = async () => {
    try {
        const response = await fetch(
            "https://cuisineconnect-9ffq.onrender.com/users/me",
            {
                credentials: "include",
            }
        );
        if (!response.ok) {
            throw new Error("Something went wrong, request failed!");
        }
        return response.json();
    } catch (err) {
        console.log(err);
    }
};

export const register = async (username, email, password) => {
    return fetch("https://cuisineconnect-9ffq.onrender.com/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    }).then((response) => response);
};
