import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./y/Layout/Layout";
import Home from "./y/Home/Home";
import Products from "./y/Products/Products";
import Cart from "./y/Cart/Cart";
import WishList from "./y/WishList/WishList"
import Brands from "./y/Brands/Brands";
import Categories from "./y/Categories/Categories";
import Register from "./y/Register/Register";
import NotFound from "./y/NotFound/NotFound";
import Error from "./y/Error/Error"
import Login from './y/Login/Login';
import Checkout from './y/Checkout/Checkout';
import MyOrders from './y/MyOrders/MyOrders'
import AuthContextProvider from './context/AuthContext';
import CartContextProvider from './context/CartContext';
import ProtectedRoute from './y/ProtectedRoute/ProtectedRoute';
import ProductDetails from './y/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './y/ForgetPassword/ForgetPassword';
import WishlistContextProvider from './y/WishlistContext/WishlistContext';
import VerifyCode from './y/Verify-Code/Verify-Code';


function App() {


  const router = createBrowserRouter([

    {
      path : "", 
      element : <Layout/>,
      errorElement : <Error/>,
      children : [

        {
          index: true,
          
          element : <ProtectedRoute>
          <Home/> 
          </ProtectedRoute>
        },
        {
          path : "/products",
          element : <ProtectedRoute>
            <Products/> 
          </ProtectedRoute>
        },
        {
          path : "/cart",
          element : <ProtectedRoute>
            <Cart/> 
          </ProtectedRoute>
        },
        {
          path : "/wishlist",
          element : <ProtectedRoute>
            <WishList/> 
          </ProtectedRoute>
        },
        {
          path : "/checkout",
          element : <ProtectedRoute>
            <Checkout/> 
          </ProtectedRoute>
        },
        {
          path : "/allorders",
          element : <ProtectedRoute>
            <MyOrders/> 
          </ProtectedRoute>
        },
        {
          path : "/brands",
          element : <ProtectedRoute>
            <Brands/>
          </ProtectedRoute> 
        },
        
        {
          path : "/categories",
          element : <ProtectedRoute>
            <Categories/> 
          </ProtectedRoute>
        },
        {
          path : "/product-details/:id/:category",
          element : 
            <ProductDetails/> 
        
        },
        {
          path : "/register",
          element : <Register/> 
        },
        {
          path : "/login",
          element : <Login/> 
        },
        {
          path : "/forgetpassword",
          element : <ForgetPassword/> 
        },
        {
          path : "/verify-code",
          element : <VerifyCode/> 
        },
        {
          path : "*",
          element : <NotFound/> 
        },


      ]
    }

  ])

  return (
    <>

    <AuthContextProvider>
    <CartContextProvider>
      <WishlistContextProvider>

    <RouterProvider router = {router}/>
    <ToastContainer />  
    
    


    </WishlistContextProvider>
    </CartContextProvider>

    </AuthContextProvider>
    </>
  )
}

export default App
