
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'; 
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/constants"

const Login = () => {
       const [emailId, setemailId] =  useState("@gmail.com") ;
       const [passWord, setpassword] =  useState("") ;
       const [firstName , setFirstName] = useState("")
       const [lastName ,  setLastName] = useState("")
       const [error , setError] = useState("");
       const [isLogin , setIsLogin] = useState(true) ;

       const dispatch = useDispatch(); 

       const navigate = useNavigate()

       const handelLogin = async () => {  
      try {
         const res =  await  axios.post( BASE_URL + "/login" , {
            emailId ,
            passWord,
           } , {withCredentials : true} 
          );
        
          dispatch(addUser(res.data))
          return navigate("/feed");
        
      } catch (err) {
      
        setError(err?.response?.data || "Something went wrong!!")
       
      } 
       }
      const handleSignup = async () => {
        try {
          const res = await axios.post(BASE_URL + "/signup" , 
          {firstName , lastName , emailId , passWord} ,
          {withCredentials : true})
          dispatch(addUser(res.data.data))
          navigate("/profile")
        } catch (error) {
          setError(error?.response?.data || "Something went wrong!!")
        }
      }

  return (

<div
  className={`card bg-base-100 image-full w-96 shadow-sm ml-[38%] h-[70%] ${isLogin ? 'mt-12' : 'mt-2'}`}
>
  <figure>
    <img
      src="https://img.freepik.com/premium-vector/blue-polygon-dark-background-square-social-template-vector_53876-170115.jpg?ga=GA1.1.784209886.1744316224&semt=ais_items_boosted&w=740"
      alt="Background" />
  </figure>
  <div className="card-body">
    <h2 className="card-title justify-center">{isLogin ? "Login" : "Signup"}</h2>
    <fieldset className="fieldset">
        {!isLogin && (
    <>
    <legend className="fieldset-legend w-[290px]">First name :</legend>
    <input
   type="text"
    className="input" 
    value = {firstName}
    onChange={(e) => setFirstName(e.target.value)}
    placeholder="Type here" />
  <legend className="fieldset-legend mt-3">Last name :</legend>
  <input
   type="text"
   className="input"
   value = {lastName}
   onChange={(e) => setLastName(e.target.value)}
   placeholder="Type here" />
   </>)}
  <legend className="fieldset-legend w-[290px]">EmailId :</legend>
  <input
   type="text"
    className="input" 
    value = {emailId}
    onChange={(e) => setemailId(e.target.value)}
    placeholder="Type here" />
    
  <legend className="fieldset-legend mt-3">Password :</legend>
  <input
   type="text"
   className="input"
   value = {passWord}
   onChange={(e) => setpassword(e.target.value)}
   placeholder="Type here" />
</fieldset>
<p className='text-red-400 my-4'> {error}</p>
    <div className="card-actions justify-center mt-1">
      <button className="btn btn-primary mb-6" onClick={ isLogin ? handelLogin : handleSignup} > {isLogin ? "Login" : "Signup"}</button>
    </div>
    <p className='m-auto cursor-pointer text-blue-300' onClick={() => setIsLogin((value) => !value )}> {isLogin ? "New User? Signup here" : "Existing User? Login here"}</p>
  </div>
</div>

  )
}

export default Login