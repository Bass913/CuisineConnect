export const getRecipes = async () => {
    return fetch("https://cuisineconnect-9ffq.onrender.com/recipe", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
};

export const getRecommendation = async (recipeId) => {
    return fetch(
        `https://cuisineconnect-9ffq.onrender.com/recipe/${recipeId}/recommendations`
    )
        .then((response) => response.json())
        .catch(() => {
            return false;
        });
};

export const addComment = async (recipeId, comment, rating) => {
    return fetch(
        `https://cuisineconnect-9ffq.onrender.com/recipe/${recipeId}/review`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ comment, rating }),
        }
    ).then((response) => response);
};

export const getAllComments = async (recipeId) => {
    return fetch(
        `https://cuisineconnect-9ffq.onrender.com/recipe/${recipeId}/reviews`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((response) => response.json());
};
