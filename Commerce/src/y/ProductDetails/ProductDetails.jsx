import { useContext, useEffect, useState } from "react";
import axios  from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import RelatedProduct from "../RelatedProducts/RelatedProducts"
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { WishContext } from "../WishlistContext/WishlistContext";

export default function ProductDetails() {
  const [productDetails, setProductsDetails] = useState({});
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const {id} = useParams();
  const {addToCart} = useContext(CartContext);
  const {addToWishList} = useContext(WishContext)
  async function getProductDetails(id) {
    
    setIsLoading(true)
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      console.log(data.data);
      setProductsDetails(data.data)
      setError(null)
      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProductsDetails([])
      
    }finally{
      setIsLoading(false)
    }
  }
    



  useEffect(()=>{
    getProductDetails(id)
  },[id])


  async function addProductToCart(productId) {
    const Resp =  await addToCart(productId);
    console.log(Resp);
    if(Resp.status === "success"){
    toast.success(Resp.message)
    }else{
    toast.error("something went wrong")

  }




  // async function addProductToWishlist(productId) {
    
  //   const dats = await addToWishList(productId);
  //   console.log(dats);
  //   if (dats.status === 'success') {
  //     toast.success(dats.message)
  //   }else{
  //     toast.erro('something went wrong')
  //   }
    
  // }

  }

  async function addProductToWishlist(productId) {
    
    const dats = await addToWishList(productId);
    console.log(dats);
    if (dats.status === 'success') {
      toast.success(dats.message)
    }else{
      toast.error('something went wrong')
    }
    
  }


  return (
    <>
    <section className="py-20">
      <div className="container mx-auto">

    {
      isLoading ? <Loader/>
      : error ? (
      <div className="alert alert-error">{error}</div>
    ) : (
    
    <div className="row items-center">

      <div className="w-1/3 px-4">

      <Slider {...settings}>
        {
          productDetails?.images?.map((src,index) =>(
          
            <img key={index} src={src} alt={productDetails.title} />

          
          ))}
    
    </Slider>
      


      </div>

      <div className="w-2/3 px-4">

      <h1 className="text-2xl mb-4">{productDetails.title}</h1>
      <p className="mb-2">{productDetails.description}</p>

      <div className="flex justify-between text-gray-500 mb-2 font-light">

                      <div>
                      <p>{productDetails?.category?.name}</p>
                      <span>{productDetails.price} EGP</span>

                      </div>
                    <div>
                      <i className="fas fa-star text-yellow-300"></i>
                      <span>{productDetails.ratingsAverage}</span>
                    </div>

                  </div>   

                  <i onClick={() => addProductToWishlist(productDetails.id)} className="fa-solid fa-heart font-bold text-2xl"></i>

                  <button onClick={() => addProductToCart(productDetails.id)} className="btn btn-green w-full">Add To Cart</button>


      </div>


    </div>
    
    )}

      </div>
    </section>

    <RelatedProduct/>
    </>
  )
}
