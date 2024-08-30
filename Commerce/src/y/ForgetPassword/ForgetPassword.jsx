import { useContext} from "react";
import {useFormik} from "formik"
import axios from "axios";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



export default function ForgetPassword() {
  const {setAccessToken} = useContext(AuthContext)  

  const initialValues = {
  email : "",  
  };

  const validationSchema = Yup.object().shape({
    email : Yup.string().email().required(),
  })


  const formik =  useFormik({
    initialValues : initialValues,
      validationSchema,
      onSubmit : handleForget
    });


    async function handleForget(values) {
      
      console.log("submit",values);
      
      try {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values);
        console.log("for",data);
        if(data.message === 'success'){

          setAccessToken(data.token)
          localStorage.setItem("accessToken",data.token);
          

          
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }


  return (
    <>
    
<div className="container mx-auto py-12">
<form onSubmit={formik.handleSubmit}>
    
    <div className="mb-6">
      <h3 className="font-bold text-2xl mb-2">please enter your e-mail</h3>
      <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-mail" required />

      {formik.errors.email && formik.touched.email &&(
        <span className="text-red-600">{formik.errors.name}</span>
      )}

      <NavLink to={"/verify-code"}><button className="bg-white font-bold text-green-400 p-2 border-2 border-green-400 mt-2 rounded-lg">Verify</button></NavLink>
  </div>
</form>
</div>

    </>
  )
}
