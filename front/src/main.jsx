import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./layouts/root.jsx";
import ErrorPage from "./pages/error-page.jsx";
import App from "./App.jsx";
import RecipesList from "./pages/recipes-list.jsx";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import RecipeDetail from "./pages/recipe-detail.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import { UserProvider } from "./hooks/useUser.jsx";
import ProtectedRoute from "./middlewares/ProtectedRoute.jsx";
import FavoriteRecipes from "./pages/favorite-recipes.jsx";
import { getUserFavorites } from "./api/user.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "recipes/search",
        element: <RecipesList />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          let searchTerm = url.searchParams.get("term");
          console.log(searchTerm);
          const recipes = fetch("http://localhost:3000/assistant/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: searchTerm }),
          }).then((response) => response.json());
          return defer({
            recipes,
          });
        },
      },
      {
        path: "recipe/:title",
        element: <RecipeDetail />,
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        children: [
          {
            path: "favorite-recipes",
            element: <FavoriteRecipes />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
