import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./layouts/root.jsx";
import ErrorPage from "./pages/error-page.jsx";
import App from "./App.jsx"
import RecipesList from "./pages/recipes-list.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
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
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>);
