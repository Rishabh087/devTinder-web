import React from 'react'

const userCard = ({user}) => {
  const {firstName , lastName ,  age , gender , about, photoUrl} = user ;
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
      <button className="btn btn-secondary">Ignore</button>
      <button className="btn btn-primary">Interested</button>
    </div>
  </div>
</div>
  )
}
export default userCard