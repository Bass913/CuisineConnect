import { useUser } from "../hooks/useUser";

export const login = async (email, password) => {
  return fetch("http://localhost:3000/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response);
};

export const logoutProfile = () => {
  localStorage.removeItem("access_token");
};

export const register = async (username, email, password) => {
  return fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  }).then((response) => response);
};

export const getUserInfo = async () => {
  const { setIsLoggedIn } = useUser();
  try {
    const response = await fetch("http://localhost:3000/users/me", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Something went wrong, request failed!");
    }
  } catch (err) {
    setIsLoggedIn(false);
    console.log(err);
  }
};
