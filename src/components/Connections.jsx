import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addConnections } from "./../utils/connectionSlice"
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {

const dispatch  = useDispatch()
const connections = useSelector((store) => store.connections)

const fetchConnections =  async () =>{
    
try {
    const res = await axios.get(BASE_URL + "/user/connections" , 
        {
            withCredentials: true
        })

dispatch(addConnections(res.data.data))
    
} catch (error) {
   console.log(error.message)
}
}
useEffect(() =>{
    fetchConnections()
} , [])

if(!connections) return ;

if(connections.length === 0) return <div><h1 className='flex justify-center mt-10 text-xl font-bold'>No connection found</h1></div>

  return (
    <div>
    <h1 className='flex justify-center mt-10 text-3xl font-bold'>Connections</h1>
    {connections.map((connection) => {
        const {firstName , lastName , age , gender , about , photoUrl} = connection 
  return( 
        <div className='flex m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto'>
        <div><img alt="image" className="h-20 w-20 rounded-full" src={photoUrl}></img></div>
        <div className='mx-4'>
        <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
        {age && gender && (<h2>{gender + ", " + age}</h2>)}
        <p>{about}</p>
        </div>
        </div>
        )
        })
        }
        </div>
        )
}

export default Connections