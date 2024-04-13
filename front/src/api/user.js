export const getUserFavorites = async () => {
    return fetch("https://cuisineconnect-9ffq.onrender.com/users/favorite", {
        method: "GET",
        credentials: "include",
    }).then((response) => response.json());
};

export const addFavorite = async (recipeId) => {
    return fetch("https://cuisineconnect-9ffq.onrender.com/users/favorite", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
    }).then((response) => response);
};

export const addPreferences = async (body) => {
    return fetch("https://cuisineconnect-9ffq.onrender.com/users/preferences", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((response) => response);
};

export const removePreferences = async (body) => {
    return fetch("https://cuisineconnect-9ffq.onrender.com/users/preferences", {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((response) => response);
};

export const removeFavorite = async (recipeId) => {
    return fetch("https://cuisineconnect-9ffq.onrender.com/users/favorite", {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
    }).then((response) => response);
};
