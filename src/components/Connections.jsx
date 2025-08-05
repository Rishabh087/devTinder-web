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
<div className="min-h-screen px-4 py-10 pb-32 bg-base-100">
  <h1 className='flex justify-center text-3xl font-bold mb-8'>Connections</h1>

  <div className="flex flex-col gap-6 items-center">
    {connections.map((connection) => {
      const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;

      return (
        <div
          key={_id}
          className='flex items-start gap-4 p-6 bg-base-300 rounded-lg w-full max-w-3xl shadow-md'
        >
          <img
            alt="profile"
            className="h-20 w-20 rounded-full object-cover"
            src={photoUrl || "/default-profile.png"}
          />

          <div className='flex-1'>
            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
            {age && gender && (
              <h3 className="text-sm text-gray-400">{gender + ", " + age}</h3>
            )}
            <p className="mt-2 text-sm">{about}</p>
          </div>
        </div>
      );
    })}
  </div>
</div>
);

}

export default Connections