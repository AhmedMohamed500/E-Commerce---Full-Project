import { useState } from "react";
import {useFormik} from "formik"

import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";



export default function Checkout() {
  const {getPayment , cartId} = useContext(CartContext);
  const [error, setError] = useState(null);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const {setAccessToken} = useContext(AuthContext);  
  const [isOnline, setIsOnline] = useState(false)
  const initialValues = {

    details : "",
    phone : "",
    city : "",

  };

  const formik =  useFormik({
  initialValues : initialValues,
  
    onSubmit : handleCheckout
  });



async function handleCheckout(values){
  console.log("submit",values);

  const url = isOnline
  ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
  : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`
  const pay = await getPayment(url,values);
  if (pay.status === 'success') {
    console.log('data' ,pay.session.url);
    if (isOnline) {
    window.location.href = pay.session.url
      
    }else{
      toast.success("Payment Done Successfully");
      setTimeout(() => {
      navigate("/allorders");
        
      }, 5000);
    }
  
    
  }else{
    //
  }
}


return (
  <>

<div>
<h1 className="text-black font-bold mt-24 max-w-xl mx-auto mb-0">Checkout</h1>
</div>


<form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">

<div className="relative z-0 w-full group mt-4">
    <input type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform   top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>


</div>

<div className="relative z-0 w-full group mt-4">
    <input type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details}/>
    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform   top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>


 

</div>

<div className="relative z-0 w-full group mt-4">
    <input type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city}/>
    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform   top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city</label>


</div>

<input type="checkbox" name="" id = "isOnline" onChange={() => setIsOnline(!isOnline)} />
<label className="mx-2" htmlFor="isOnline">is Pay Online</label>

<button  type="Submit" className="btn btn-green w-full">
  {isOnline ? 'Pay Online' : 'Pay Cash'}
</button>

</form>


</>
)

}



