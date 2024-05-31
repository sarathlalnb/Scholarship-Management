import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import waves from '../waves3new.json';
import { ToastContainer, toast } from 'react-toastify';
import pattern from '../assets/Images/patterns.png';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isAdmin, setIsAdmin] = useState(false); // State for admin checkbox
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', formData);
      const { token, data } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('data', data);
      console.log(data);
     
      setTimeout(() => {
        if (isAdmin) {
          navigate('/adminhome');
          toast.success('Welcome Admin');

        } else {
          navigate('/home');
           toast.success('Welcome User');
        }
      }, 2000);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <center>
        <div className='bg-image2'>
          <div className='color-div2  rounded-md shadow-2xl mt-20 lg:grid grid-cols-2 '>
            <div className=' overflow-hidden col-span-1'>
              <img src={pattern} alt="" className='opacity-15 w-full h z-[-1]' />
              <div className='z-[99] mt-[-450px]'>
                <h1 className='font-bold text-[25px] border-b-2 border-b-[#e6ac00] w-48 mt-10'>Welcome Back<span className='text-[#e6ac00]'>!</span></h1>
                <p className='mt-6 font-semibold text-lg'>Login For Exiting Features</p>
                <p className='font-thin mt-4'>Lorem ipsum dolor sit <br /> amet consectetur, adipisicing elit . <br /> Ab laborum modi a, d</p>
              </div>
            </div>

            <div className='mt-3 col-span-1 '>
              <form className='mt-4 py-3 px-24' onSubmit={handleSubmit}>
                <div className='form-floating flex flex-col '>
                  <label htmlFor='username' className=' text-slate-500 -ms-80'>Username</label>
                  <input
                    type='text'
                    className='form-control rounded shadow-2xl border-2 border-gray-100 h-9 p-2 w-72'
                    id='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-floating flex flex-col mt-5'>
                  <label htmlFor='password' className='-ms-80 text-slate-500'>Password</label>
                  <input
                    type='password'
                    className='form-control rounded shadow-2xl border-2 border-gray-100 h-9 p-2  w-72'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className='text-red-500 mt-2'>{error}</p>}
                <div className='mt-7'>
                  <p className='reg'>Not yet a member? <Link to={'/register'} className='underline'>Register Now</Link></p>
                </div>
                <div className='reg-div2 flex justify-center drop-shadow-2xl rounded mt-4 bg-[#e6ac00]'>
                  <button variant='' type='submit' className='btn h-9'>
                    Login
                  </button>
                </div>

                <div className='flex mt-4'>
                  <input
                    type="checkbox"
                    className='mt-1 font-semibold'
                    checked={isAdmin}
                    onChange={handleCheckboxChange}
                  />
                  <small className='ms-2 font-semibold'>Login as Admin </small>
                </div>
              </form>
            </div>
          </div>
          <div className='waves2'>
            <Lottie animationData={waves} loop={true} />
          </div>
        </div>
        <ToastContainer />
      </center>
    </>
  );
}

export default Login;
