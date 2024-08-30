import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Products() {
    


  return (
    <>
  <section className="py-20">

    <div className="container mx-auto">

    <form className="flex items-center max-w-sm  mx-auto">   
    <div className="relative w-full">
    
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search....." required />
    </div>
    
</form>

    </div>

  </section>

  <RecentProducts/>
    </>
  )
}
