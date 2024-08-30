import {createContext,useContext,useEffect,useState} from "react";
import axios  from "axios";
import { AuthContext } from "./AuthContext";
export const CartContext =  createContext();

export default function CartContextProvider({children}){

const {accessToken} = useContext(AuthContext);
const [numOfCartItems, setNumOfCartItems] = useState(0);
const [cartDetails, setCartDetails] = useState(null)
const [cartId, setCartId] = useState(null)
const [userId, setUserId] = useState(null)
const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`  


const headers = {
        token : accessToken,
};


useEffect(()=>{
    accessToken && getCart()
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



    async function updateQuantity(productId,count) {
        
        try {
            const {data} = await axios.put(`${endpoint}/${productId}`,{headers} , {count});
            setCartId(data.data._id);
            setUserId(data.data.cartOwner)


            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data.data)
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;
        }
    }


    async function getPayment(url , shippingAddress) {

        try {
            const {data} = await axios.post(url, {shippingAddress} , {headers});
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
            return error.response.data.message;
        }
        
    }
    return (

        <CartContext.Provider value={{numOfCartItems , cartDetails , addToCart , getCart , removeFromCart , updateQuantity, getPayment , cartId , userId}}>
        {children}

    </CartContext.Provider>
    );
} 