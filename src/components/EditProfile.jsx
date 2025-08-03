import React, { useState } from 'react';
import UserCard from './UserCard';
import {BASE_URL}from "./../utils/constants"
import {addUser}from "./../utils/userSlice"
import {useDispatch} from "react-redux"
import axios from "axios"

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const [error, setError] = useState('');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [showToast , setShowToast] = useState(false)

  const dispatch = useDispatch() 

  const saveProfile =  async ()  =>{
    try {
      setError("")
    
      const res =  await axios.patch( "http://localhost:3000/profile/edit"  ,
         {firstName , lastName , age , gender , about , photoUrl} ,
         { withCredentials: true
          }
        )
        dispatch(addUser(res?.data?.data))
        setShowToast(true)
        const i = setTimeout(() => {
          setShowToast(false)
        } , 3000)
    } catch (err) {
      setError(err.response.message)
    }
  }

  return ( 
    <>
    <div className='flex justify-center'>
    <div className="flex justify-center my-2 h-[70%] mx-5">
      <div className="card bg-base-300 w-80 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <label className="form-control w-full max-w-xs my-0">
            <div className="label">
              <span className="label-text">First Name:</span>
            </div>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs my-0">
            <div className="label">
              <span className="label-text">Last Name:</span>
            </div>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs my-0">
            <div className="label">
              <span className="label-text">Age:</span>
            </div>
            <input
              type="text"
              value={age}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs my-0">
            <div className="label">
              <span className="label-text">Gender:</span>
            </div>
            <select defaultValue="Pick a color" className="select"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            >
            <option disabled={true}>Select your gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs my-0">
            <div className="label">
              <span className="label-text">About:</span>
            </div>
           <textarea className="textarea" placeholder="Bio"
           type="text"
           value={about}
           onChange={(e) => setAbout(e.target.value)}
           >

           </textarea>
          </label>

          <label className="form-control w-full max-w-xs my-0">
            <div className="label">
              <span className="label-text">Photo URL:</span>
            </div>
            <input
              type="text"
              value={photoUrl}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          <p className='text-red-400 my-2'> {error}</p>
    <div className="card-actions justify-center my-0">
      <button className="btn btn-primary -my-2" onClick={saveProfile}>Save profile</button>
    </div>
        </div>
      </div>
    </div>
    <UserCard user= {{firstName , lastName , gender , age , photoUrl , about }} ></UserCard>
  </div>
{showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile edited successfully.</span>
  </div>
</div>)}
</>
);
};

export default EditProfile;
