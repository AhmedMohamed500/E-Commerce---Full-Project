import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";


export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductsCategories() {
    setIsLoading(true)
    
    try {
      const {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      console.log(data.data);
      setCategories(data.data);
      setError(null)

      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setCategories([])

      
    }finally{
      setIsLoading(false)
    }
  }
    

  useEffect(() =>{
    getProductsCategories()
  }, [])


  return (
    <>
    <div className="Categories-Cart py-20">

    <div className="container mx-auto">

  
    {
            isLoading ? <Loader/>
            : 
            error ? (
              <div className="alert alert-error">{error}</div>
              ) : (
          
            
      <div className="row">
      {

          categories.map( (cat) => (
          <div className="w-1/3 px-4" key={cat._id}>  
            <img className={"h-96 w-full rounded-md border-2 border-rose-500"} src={cat.image} alt={cat.name} />
            <h2 className="mb-4 font-bold text-3xl text-center text-green-500">{cat.name}</h2>
          </div>
        ))}

      </div>
            
    )} 
    </div>

    </div>
    </>
  )
}
