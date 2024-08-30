import { useContext } from "react"
import { WishContext } from "../WishlistContext/WishlistContext"
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";


export default function WishList() {
    const {userWishDetails,getUserWishList,setUserWishDetails,setCartDetails,removeFromCart} = useContext(WishContext)
    const {accessToken} = useContext(AuthContext)
    const {addToCart} = useContext(CartContext)
    const {getCart} = useContext(CartContext)
    



    async function getCartDetails() {


        const Res =  await getCart();
        if(Res.status == 'success'){
            setCartDetails(Res.data)
    
        }else {
        console.log(Res);
        
        }
        
    }

    async function removeProductFromCart(productId) {
        const re = await removeFromCart(productId)
        console.log(re);
        if(re.status == 'success'){
        toast.success('products removed successfully')
        }else{
        toast.error('wrong')
    
        }
        
    }



    useEffect(()=>{
        accessToken && getCartDetails()
    },[accessToken])


    useEffect(()=>{
        accessToken && getUserWishListDetails()
    },[accessToken])


    
async function getUserWishListDetails() {
    try {
        const res =  await getUserWishList();    
        console.log(res.data);
        setUserWishDetails(res.data)
        
    } catch (error) {
        console.log(error)
    }
    }

    
    async function addProductToCart(productId) {
        const Resp =  await addToCart(productId);
        console.log(Resp);
        if(Resp.status === "success"){
        toast.success(Resp.message)
        removeProductFromCart(productId)
        }else{
        toast.error("something went wrong")
    }
    }
    

    return (
    <>
    
    <section className="py-20">
    
    <div className="container mx-auto">
        <h1 className="text-3xl font-bold"> My WishList</h1>

    

    { userWishDetails && (

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
                Product
            </th>
            <th scope="col" className="px-6 py-3">
                Qty
            </th>
            <th scope="col" className="px-6 py-3">
                Price
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    <tbody>

    {
        userWishDetails.map((item) =>(

        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
            <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {item.title}
        </td>
        <td className="px-6">
            <div className="flex items-center">
            <button onClick={() => addProductToCart(item.id)} className=" btn btn-green font-bold">Add To Cart</button>
            </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {item.price}EGP
        </td>
        <td className="px-6 py-4">
            <button onClick = {() => removeProductFromCart(item.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
    </tr>
        ))}
    </tbody>
</table>
</div>

    )}




    </div>
    </section>

    </>
)
}
