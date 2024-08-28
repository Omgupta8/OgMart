// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { Route, RouterProvider ,createRouterFromElements} from "react-router";
import {
  createBrowserRouter,
  // createRouterFromElements,
  RouterProvider,
  // Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/features/store.js";

import Home from "./pages/Home.jsx";

// Private Route
import PrivateRoute from "./components/PrivateRoute.jsx";

// Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Profile from "./pages/User/Profile.jsx";
import Favorite from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";

//Admin
import AdminRoutes from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      // Admin Routes
      {
        path: "",
        element: <PrivateRoute />,
        children: [{ path: "profile", element: <Profile /> }],
      },
      {
        path: "/admin",
        element: <AdminRoutes />,
        children: [
          { path: "userlist", element: <UserList /> },
          { path: "categorylist", element: <CategoryList /> },
          { path: "productlist", element: <ProductList /> },
          { path: "allproductslist", element: <AllProducts /> },
          { path: "product/update/:_id", element: <ProductUpdate /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <App />
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
