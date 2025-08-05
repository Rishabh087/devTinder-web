import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addRequest, removeRequest } from '../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);



  const reviewRequest = async (status , _id) => {
    try {
        const res =  await axios.post(BASE_URL + "/request/review/" + status + "/" + _id , {} , 
            {withCredentials : true}
         )
    } catch (error) {
      console.log(error.message)  
    }
  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true
      });
      dispatch(addRequest(res.data.data));
      dispatch(removeRequest(_id))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div>
        <h1 className='flex justify-center mt-10 text-xl font-bold'>
          No request found
        </h1>
      </div>
    );

return ( 
  <div>
    <h1 className='flex justify-center mt-10 text-3xl font-bold'>Requests</h1>

    {requests.map((request) => {
      const { _id, firstName, lastName, age, gender, about, photoUrl } = request.fromUserId;

      return (
        <div
          key={_id}
          className='flex items-start gap-6 m-4 p-6 bg-base-300 rounded-lg w-2/3 mx-auto shadow-md'
        >
      
          <div>
            <img
              alt="profile"
              className="h-24 w-24 rounded-full object-cover"
              src={photoUrl || "/default-profile.png"}
            />
          </div>

          
          <div className='flex-1'>
            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
            {age && gender && <h3 className="text-sm text-gray-600">{gender + ", " + age}</h3>}
            <p className="mt-2 text-sm">{about}</p>
          </div>

          <div className="card-actions flex justify-center mt-4">
            <button className="btn btn-secondary" onClick={() => reviewRequest("rejected" , request._id)}>Reject</button>
            <button className="btn btn-primary ml-2" onClick={() => reviewRequest("accepted" , request._id)}>Accept</button>
          </div>
        </div>
      );
    })}
  </div>
);
}


export default Requests;
