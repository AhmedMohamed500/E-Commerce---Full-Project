import { useState } from "react";
import {useFormik} from "formik"
import axios from "axios";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Register() {
  const [error, setError] = useState(null)
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate()
  const {setAccessToken} = useContext(AuthContext)  
  const initialValues = {
    name : "",
    email : "",
    phone : "",
    password : "",
    rePassword : "",
  };
  
  const validationSchema = Yup.object().shape({
    name :  Yup.string().min(3,'name must be at least 3 char').max(15).required("Name is Required"),
    email : Yup.string().email().required("not valid"),
    phone : Yup.string().matches(/^(002)?01[0125][0-9]{8}$/i,).required(),
    password : Yup.string().matches(/^[A-Z][a-z0-9_]{2,8}$/).required(),
    rePassword : Yup.string().oneOf([Yup.ref("password")],"hello").required()
  })

  const formik =  useFormik({
  initialValues : initialValues,
  // validate : ValidateForm,
    validationSchema,
    onSubmit : handleRegister
  });



async function handleRegister(values){

  setisloading(true)
  
  console.log("submit",values);
  try {
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(data);

      if(data.message === 'success'){

        setAccessToken(data.token)

        navigate("/login")
      }
      
  }catch(error){
    console.log(error);
    setError(error.response.data.messege) 
    
  }finally{
    setisloading(false)
  }
  
}


return (
  <>

<div>
<h1 className="text-black font-bold mt-24 max-w-xl mx-auto mb-0">Register</h1>
</div>

  {error && <div className="alert alert-error max-w-xl mx-auto">{error}</div>}

<form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">

<div className="relative z-0 w-full group mt-8">
    <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform   top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
    
    {formik.errors.name && formik.touched.name &&(
      <span className="text-red-600">{formik.errors.name}</span>
    )}

</div>

<div className="relative z-0 w-full group mt-4">
    <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform  top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>

    {formik.errors.email && formik.touched.email &&(
      <span className="text-red-600">{formik.errors.name}</span>
    )}

</div>

<div className="relative z-0 w-full group mt-4">
    <input type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform   top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>



    {formik.errors.phone && formik.touched.phone &&(
      <span className="text-red-600">{formik.errors.name}</span>
    )}

</div>

<div className="relative z-0 w-full group mt-4">
    <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform   top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>


    {formik.errors.password && formik.touched.password &&(
      <span className="text-red-600">{formik.errors.name}</span>
    )}

</div>

<div className="relative z-0 w-full group mt-4">
    <input type="password" name="rePassword" id="repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}/>
    <label htmlFor="repassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform   top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Confirmation Password</label>

    {formik.errors.rePassword && formik.touched.rePassword &&(
      <span className="text-red-600">{formik.errors.name}</span>
    )}

</div>

{"isValid "+ formik.isValid}
<br />
{"dirty "+ formik.dirty}
<br />
{"hi "+!(formik.isValid && formik.dirty).toString()}
<br />

<button disabled={!(formik.isValid && formik.dirty)} type="Submit" className="btn btn-green">{isloading ?
<i className="fas fa-spinner fa-spinner"></i>
:"Register"}</button>

</form>


</>
)

}



