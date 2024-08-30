import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";


export default function RecentProducts() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getRecentProducts() {
    
    setIsLoading(true)
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      console.log(data.data);
      setProducts(data.data)
      setError(null)
      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProducts([])
      
    }finally{
      setIsLoading(false)
    }
  }
    

  useEffect(()=>{
    getRecentProducts()
  },[])
  return (
    <>
      <section className="py-20">

        <div className="container mx-auto">

        <input type="text" id="simple-search" className="mb-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search....." required />

            <h1 className=" font-bold">RecentProduct</h1>


            
            {
            isLoading ? <Loader/>
            : 
            error ? (
              <div className="alert alert-error">{error}</div>
              ) : (
          
            <div className="row">
              {
                products.map((product)=> 
                <Product key={product.id} product={product}/>
              )}
            </div> 
            
            )} 

        </div>
    
  </section>
            
    </>
  );
}
