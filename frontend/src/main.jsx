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
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Order from "./pages/Orders/Order.jsx";
import UserOrders from "./pages/User/UserOrders.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

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
      {
        path: "/user-orders",
        element: <UserOrders />,
      },
      // Admin Routes
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "shipping", element: <Shipping /> },
          { path: "placeorder", element: <PlaceOrder /> },
          { path: "order/:id", element: <Order /> },
        ],
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
          { path: "orderlist", element: <OrderList /> },
          { path: "dashboard", element: <AdminDashboard /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <App />
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
