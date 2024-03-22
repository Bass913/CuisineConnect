
export const login = (email, password) => {
    return fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    }).then((response) => response);
};

export const logoutProfile = () => {
    localStorage.removeItem("access_token");
};

export const register = (
    username,
    email,
    password,
) => {
    return fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    }).then((response) => response);
};

