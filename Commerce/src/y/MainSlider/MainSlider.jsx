import { useEffect, useState } from "react";
import classes from "./MainSlider.module.css";
import img1 from "../../assets/images/belt (1).png";
import img2 from "../../assets/images/chair (9).png";
import Slider from "react-slick";

import slide1 from "../../assets/images/organic vegetables.png";
import slide2 from "../../assets/images/vegetable.png";
import slide3 from "../../assets/images/fruit-img (9).png"


export default function MainSlider() {



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false,
    autoplay : true
  };
    

  const images = [

    {
      src : slide1,
      label : 'images1'
    },
    {
      src : slide2,
      label : 'images2'
    },
    {
      src : slide3,
      label : 'images3'
    },

  ]
  return (
    <>
    <section className="py-20">

          <div className="container mx-auto">

          <div className="row">

            <div className="w-2/3">

          <Slider {...settings}>
          {
            images.map((img,index) => (

              <img key={index} className="h-[200px]" src={img.src} alt={img.label} />

            
            ))}
          
        
          </Slider> 

            </div>

            <div className="w-1/3">
              <img className="h-[200PX]"  src={img1} alt="slide" />
              <img className="h-[200PX]" src={img2} alt="slide" />
            </div>
            
          </div>

          </div>

    </section>
    </>
  )
}
