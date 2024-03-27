export const getUserFavorites = async () => {
  return fetch("http://localhost:3000/users/favorite", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const addFavorite = async (recipeId) => {
  return fetch("http://localhost:3000/users/favorite", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId }),
  }).then((response) => response);
};

export const removeFavorite = async (recipeId) => {
  return fetch("http://localhost:3000/users/favorite", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId }),
  }).then((response) => response);
};
