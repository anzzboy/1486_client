import React from "react";
import ReactDOM from "react-dom/client";

// navigation

import Home from "./components/Home.jsx";
import Admin from "./components/Admin.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ],
  { basename: "/1486_client/" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
