export const getRecipes = async () => {
    return fetch("http://localhost:3000/recipe", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}