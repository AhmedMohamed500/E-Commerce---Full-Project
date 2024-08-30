import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function Brands() {

  const [brandsOfProducts, setBrandsOfProducts] = useState([]);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductsBrands() {
    
    setIsLoading(true)
    try {
      const {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      console.log(data.data);
      setBrandsOfProducts(data.data);
      setError(null)

      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setBrandsOfProducts([])
  
  }finally{
    setIsLoading(false)
  }
    
}
useEffect(() =>{
  getProductsBrands()
}, [])


return (
  <>
  <h1 className="text-center text-green-500 font-bold mb-4 text-3xl mt-12">All Brands</h1>

  <div className="Brands py-20">
<div className="container mx-auto">

{
  isLoading ? <Loader/>
  : error ? (
  <div className="alert alert-error">{error}</div>
) : (

<div className="row">
      {

  brandsOfProducts.map( (brand) => (
          <div className="w-1/4 px-2" key={brand._id}>
            <div className="card-brand">
              <img className={" rounded-md border-2 border-gray-400 py-12 mb-6"} src={brand.image} alt={brand.name} />
            </div> 

          

          </div>
        ))}

      </div>
)}



</div>

  </div>
  </>
)

}

