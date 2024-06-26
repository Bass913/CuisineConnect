import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./layouts/root.jsx";
import ErrorPage from "./pages/error-page.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetail from "./pages/recipe-detail.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import { UserProvider } from "./hooks/useUser.jsx";
import ProtectedRoute from "./middlewares/ProtectedRoute.jsx";
import FavoriteRecipes from "./pages/favorite-recipes.jsx";
import Preferences from "./pages/preferences.jsx";

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
          {
            path: "preferences",
            element: <Preferences />,
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
