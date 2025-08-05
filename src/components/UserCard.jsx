import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const userCard = ({user}) => {
  const { _id , firstName , lastName ,  age , gender , about, photoUrl} = user ;
  const dispatch  = useDispatch()

const hanndleSendRequest = async (status , userId)  => {
 
  try {
    const res =  await axios.post(BASE_URL + "/request/send/" + status + "/" + userId , {} ,
       {withCredentails : true}
      )
    
  } catch (error) {
    console.log(error.message)
  }

dispatch(removeUserFromFeed(userId))
 
}

  return (
  <div className="card bg-base-300 w-80 shadow-2xl my-2 mx-5 h-[585px]">
 <figure className="w-auto h-auto">
  <img
    className="h-auto w-auto"
    src={photoUrl}
    alt="userPhoto"
  />
</figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
   {(gender && age) && <h3 className='other'>{gender + " "  + age }</h3>} 
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-secondary" onClick={() => hanndleSendRequest("rejected" , _id)}>Ignore</button>
      <button className="btn btn-primary" onClick={() => hanndleSendRequest("accepted" , _id)}>Interested</button>
    </div>
  </div>
</div>
  )
}
export default userCard