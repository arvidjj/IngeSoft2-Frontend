import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout/Layout";

const router = createBrowserRouter([{
  path:"/",
  element:<Layout/>,
  errorElement:<PageNotFound/>,
  children:[
    {
      path:"home",
      element:<Home/>
    },
  ]
}]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
