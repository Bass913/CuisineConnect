export const addFavorite = async (recipeId) => {
    return fetch("http://localhost:3000/user/favorite", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId})
    }).then((response) => response);
};