import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/ProductDetails';
import Cart from './pages/cart/Cart';
import Error from './pages/Error';
import Review from './pages/products/Review';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Router } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  },
  {
    path: "/cart-items",
    element: <Cart />
  },
  {
    path: "/review/:productId",
    element: <Review />
  },
  {
    path: "/diet-plans",
    element: <Error />
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
