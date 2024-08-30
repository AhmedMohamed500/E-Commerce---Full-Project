import axios from "axios";
import {createContext,useContext,useEffect,useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";


export const WishContext = createContext()

export default function WishlistContextProvider({children}) {
const {accessToken} = useContext(AuthContext)
const [userWishDetails, setUserWishDetails] = useState(null)
const endpoint = `https://ecommerce.routemisr.com/api/v1/wishlist`
const [cartDetails, setCartDetails] = useState(null)
const [cartId, setCartId] = useState(null)
const [userId, setUserId] = useState(null)
const [numOfCartItems, setNumOfCartItems] = useState(0);
const headers ={
  token : accessToken
}

useEffect(()=>{
  accessToken && addToWishList()
},[accessToken])



async function getCart() {

  try {
  const {data} = await axios.get(endpoint, {headers});
  console.log('cart',data);
  setNumOfCartItems(data.numOfCartItems);
  setCartDetails(data.data);
  setCartId(data.data._id);
  setUserId(data.data.cartOwner)
  
      return data
  } catch (error) {
      console.log(error);
      
  }
}


async function addToCart(productId) {
  try {
  const {data} = await axios.post(endpoint, {productId},{headers});
  console.log(data);
  setNumOfCartItems(data.numOfCartItems)
  setCartDetails(data.data)
  setCartId(data.data._id);
  setUserId(data.data.cartOwner)

  return data
  
  } catch (error) {
      console.log(error);
      return error.response.data.message;
  }
}
async function getUserWishList() {

  try {
    const {data} =  await axios.get(endpoint, {headers});

    setUserWishDetails(data.data)
    return data

  
    
  } catch (error) {
    return error
    
  }
}

async function removeFromCart(productId) {
        
  try {
      const {data} = await axios.delete(`${endpoint}/${productId}`,{headers});
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setUserId(data.data.cartOwner)


      return data
  } catch (error) {
      console.log(error);
      return error.response.data.message;
  }
}

// async function removeProductFromWishList(productId) {
  
//   const rem = await removeFromWishList(productId)
//   console.log(rem);
//   if (rem.status == 'success') {
//     toast.success('removed')
//   }else{
//     toast.error('not')
//   }
// }

  async function addToWishList(productId) {
    try {
      const {data} = await axios.post(endpoint,{productId} , {headers})
      console.log(data);
      return data

      

    } catch (error) {
      console.log(error);
      return error
      
    }
    
  }
    

  // async function removeFromWishList(productId) {
    
  //   try {
      
  //     const {data} = await axios.delete(`${endpoint}/${productId}` , {headers});
  //     console.log(data);
  //     setUserWishDetails(data.data)
  //   } catch (error) {
  //     console.log(error);
  //     return error.response.data.message
  //   }
  // }


  return (
    <>
    <WishContext.Provider value={{addToWishList , getUserWishList ,removeFromCart,numOfCartItems,cartDetails,cartId,userId ,setUserWishDetails, userWishDetails,addToCart,getCart}}>{children}</WishContext.Provider>
    </>
  )
}
