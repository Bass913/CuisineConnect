import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./layouts/root.jsx";
import ErrorPage from "./pages/error-page.jsx";
import App from "./App.jsx";
import RecipesList from "./pages/recipes-list.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
        loader: async ({request}) => {
          const term = request.url.split('=')[1];
          const body = {message: term} 
          await fetch('http://localhost:3000/assistant/search', {
            method: 'POST',
            body: JSON.stringify(body)
          })
        }
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
