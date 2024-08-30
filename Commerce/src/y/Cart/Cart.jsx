import { useContext ,useEffect} from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



export default function Cart() {

  const {getCart , cartDetails , setCartDetails , numOfCartItems , removeFromCart , updateQuantity} = useContext(CartContext);
  const {accessToken} = useContext(AuthContext)
  


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


  async function updateProductQuantity(productId , count) {
    const no = await updateQuantity(productId , count)
    if(no.status == 'success'){
      toast.success('products Updated Successfully')
    }else{
      toast.error('wrong')

    }    
    
  }

  useEffect(()=>{
    accessToken && getCartDetails()
},[accessToken])



  return (
    <>
    <section className="py-20">

<div className="container mx-auto">

    <h1 className="text-3xl font-bold">Cart</h1>

    

{cartDetails && (

<>
<div className="flex justify-between">

  <h4 className="text-lg"> Total Items :
    <span className="text-green-500">{numOfCartItems}</span>
  </h4>
  <h4 className="text-lg"> Total Price :
  
    <span className="text-green-500">{cartDetails.totalCartPrice}</span>
  </h4>
</div>

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
            cartDetails.products.map((product) =>(

              <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src= {product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt= {product.product.title}/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {
                    product.product.title
                  }
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <button onClick={() => updateProductQuantity(product.product.id , product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div>{product.count}</div>
                        <button onClick={() => updateProductQuantity(product.product.id , product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {
                    product.price
                }
                </td>
                <td className="px-6 py-4">
                    <button onClick={() => removeProductFromCart(product.product.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                </td>
            </tr> 

          ))}
          
            
        </tbody>
    </table>
</div> 

<Link to={"/checkout"} type="button" className="btn btn-green w-full block text-center font-bold my-10">Checkout</Link>

</>

)}


</div>
    </section>
    </>
  )
}
