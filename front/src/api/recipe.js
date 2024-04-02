export const getRecipes = async () => {
  return fetch("http://localhost:3000/recipe", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getRecommendation = async (recipe) => {
  return fetch(
    `http://localhost:3000/recipe/${recipe._id}/recommendations`
  ).then((response) => response.json());
};

export const addComment = async (recipeId, comment, rating) => {
  return fetch(`http://localhost:3000/recipe/${recipeId}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ comment, rating }),
  }).then((response) => response);
};

export const getAllComments = async (recipeId) => {
  return fetch(`http://localhost:3000/recipe/${recipeId}/reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
