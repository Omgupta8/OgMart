// import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    // console.log(userInfo.data.email);

    setUserName(userInfo.data.username);
    setEmail(userInfo.data.email);
  }, [userInfo.data.email, userInfo.data.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match!");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo.data._id,
          username,
          email,
          password,
        }).unwrap();
        // console.log(res);
        

        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        // console.log(error);
        toast.error(error?.data || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[6rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

          <form onSubmit={submitHandler} action="">
            <div className="mb-4">
              <label htmlFor="" className="block text-white mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-2 rounded-sm w-full bg-neutral-700"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-2 rounded-sm w-full bg-neutral-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block text-white mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-2 rounded-sm w-full bg-neutral-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-2 rounded-sm w-full bg-neutral-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 hover:underline"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 hover:underline"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
