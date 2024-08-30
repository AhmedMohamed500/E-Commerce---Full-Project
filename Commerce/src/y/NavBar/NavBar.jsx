import { useContext} from "react";
import Logo from "../../assets/images/freshcart-logo.svg"
import {NavLink} from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

export default function NavBar() {
    const {accessToken , setAccessToken} = useContext(AuthContext);
    const {numOfCartItems} = useContext(CartContext)

  function handleLogOut() {
    localStorage.removeItem("accessToken")
    setAccessToken(null)
  }
  
  
    return (
  
<nav className="bg-gray-100 p-4 static lg:fixed top-0 end-0 start-0 z-50">

    <div className="container mx-auto">

        <div className="flex justify-between items-center flex-col lg:flex-row">

            <div className="flex items-center flex-col lg:flex-row">

                  <Link to={""}>
                  <img src={Logo}  alt="logo"/>
                  </Link>

                  {accessToken &&
                  <ul className="flex font-bold flex-col lg:flex-row items-center">
                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={""}>Home</NavLink>
                    </li>

                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={"/cart"}>Cart</NavLink>
                    </li>

                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={"/wishlist"}>WishList</NavLink>
                    </li>
                  
                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={"/products"}>Products</NavLink>
                    </li>
                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={"/categories"}>Categories</NavLink>
                    </li>
                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={"/brands"}>Brands</NavLink>
                    </li>
                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={"/cart"}>
                      
                      <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center ">
                      <i className="fas fa-cart-shopping fa-2x"></i>
                      <span className="sr-only">Notifications</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-600 border-white rounded-full -top-2 -end-2">{numOfCartItems}</div>
                      </button>

                      </NavLink>
                    </li>
                  </ul> }
                  
            </div>  

            <div className="right-side">

            <ul className="flex font-bold flex-col lg:flex-row">

              {
                accessToken ? 

                <>
                <li>
                      <Link className={"p-2"}onClick={handleLogOut}>SignOut</Link>
                    </li></>:

                    <>

                    <li>
                      <NavLink className={"p-2"} to={"/login"}>Login</NavLink>
                    </li>

                    <li>
                      <NavLink className={"p-2"} to={"/register"}>Register</NavLink>
                    </li>
                    </>
              }

                    <li>
                      <a href="#" className="fab fa-facebook mx-2"></a>
                      <a href="#" className="fab fa-twitter mx-2"></a>
                      <a href="#" className="fab fa-youtube mx-2"></a>
                      <a href="#" className="fab fa-instagram mx-2"></a>
                      <a href="#" className="fab fa-tiktok mx-2"></a>
                    </li>


                  </ul>

            </div>
              

            
        </div>

    </div>

</nav>

  
  )
}
