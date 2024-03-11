import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./layouts/root.jsx";
import ErrorPage from "./pages/error-page.jsx";
import App from "./App.jsx";
import RecipesList from "./pages/recipes-list.jsx";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import RecipeDetail from "./pages/recipe-detail.jsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
