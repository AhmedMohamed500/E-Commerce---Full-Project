import { useContext, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

export default function MyOrders() {
  const {userId} = useContext(CartContext);
  

  async function getMyOrders() {

    console.log(userId);

    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }

  }
    
  

    useEffect(() => {
      userId && getMyOrders()
  },[userId])

  return (
    <>
    <section className="py-20">
    <div className="container mx-auto">

    <h1 className="text-3xl">MyOrders</h1>

    </div>

    </section>
    </>
  )

}

