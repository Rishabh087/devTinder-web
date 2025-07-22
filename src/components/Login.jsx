import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'; 
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/constants"

const Login = () => {
       const [emailId, setemailId] =  useState("manjeet@gmail.com") ;
       const [passWord, setpassword] =  useState("Manjeet@12345") ;

       const dispatch = useDispatch(); 

       const navigate = useNavigate()

       const handellogin = async () => {  
      try {
         const res =  await  axios.post( BASE_URL + "/login" , {
            emailId ,
            passWord,
           } , {withCredentials : true} 
          );
        
          dispatch(addUser(res.data))
          return navigate("/");
        
      } catch (err) {
        console.error(err);
      } 
       }
  return (
<div className="card bg-base-100 image-full w-96 shadow-sm ml-[38%] mt-12 h-[70%]">
  <figure>
    <img
      src="https://img.freepik.com/premium-vector/blue-polygon-dark-background-square-social-template-vector_53876-170115.jpg?ga=GA1.1.784209886.1744316224&semt=ais_items_boosted&w=740"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend w-[290px]">EmailId : {emailId}</legend>
  <input
   type="text"
    className="input" 
    value = {emailId}
    onChange={(e) => setemailId(e.target.value)}
    placeholder="Type here" />
  <legend className="fieldset-legend mt-3">Password : {passWord}</legend>
  <input
   type="text"
   className="input"
   value = {passWord}
   onChange={(e) => setpassword(e.target.value)}
   placeholder="Type here" />
</fieldset>
    <div className="card-actions justify-center mt-4">
      <button className="btn btn-primary" onClick={handellogin} >Login</button>
    </div>
  </div>
</div>
  )
}

export default Login