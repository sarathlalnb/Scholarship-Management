import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react'
import waves from '../waves2.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import register from '../assets/Images/register.jpg'

function Register() {
  // State variables for form inputs
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const naviagate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData); 

    try {
      const response = await axios.post('http://127.0.0.1:8000/st_reg/', formData);
      console.log('Response from the server:', response.data); 
      toast.success('Registration successful!');
      setTimeout(()=>{
        naviagate('/login');
      },2000)
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('Error submitting the form!');
    }
  };

  return (
    <div>    <center>
      <div className='bg-image'>
        <div className='flex justify-center gap-2 mt-3'>
          <FaUser className='userLogo text-black font-bold' />
          <h2 className=' text-black text-[20px] font-bold '> Register</h2>
        </div>

        <div className='color-div row-auto rounded-lg lg:grid grid-cols-2 shadow mt-3 py-5' >
          <div className='col-span-1 border-r-2 border-r-yellow-50'>
            {/* <h1>Hii</h1> */}
            <img src={register} alt="" />
          </div>

          <div className='col-span-1 mt-3 '>

            <form className='mt-2 ' onSubmit={handleSubmit}  >
              <div class="form-floating flex flex-col">
                <input type="text" class="form-control rounded shadow-2xl border-2 border-gray-100 h-9 p-2" id="floatingPassword" name="username" placeholder='Username' value={formData.username} onChange={handleChange} />
              </div>

              <div class="form-floating flex flex-col mt-3">
                <input type="text" class="form-control rounded shadow-2xl border-2  border-gray-100 h-9 p-2" id="floatingPassword" name="firstname" placeholder='First name'value={formData.firstname} onChange={handleChange} />
              </div>

              <div class="form-floating flex flex-col mt-3">
                <input type="text" class="form-control rounded shadow-2xl border-2  border-gray-100 h-9 p-2" id="floatingPassword" name="lastname" placeholder='Last name'value={formData.lastname} onChange={handleChange} />
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="email" class="form-control rounded shadow-2xl border-2  border-gray-100 h-9 p-2" id="floatingPassword" name="email" placeholder='E-mail' value={formData.email} onChange={handleChange}/>
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="password" class="form-control rounded shadow-2xl border-2  border-gray-100 h-9 p-2" id="floatingPassword" name="password" placeholder='Password'value={formData.password} onChange={handleChange} />
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="number" class="form-control rounded shadow-2xl border-2 h-9 p-2  border-gray-100" id="floatingPassword"  name="phone" placeholder='Phone'value={formData.phone} onChange={handleChange} />
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="text-area" class="form-control rounded shadow-2xl border-2 h-9 p-2  border-gray-100" id="floatingPassword"  name="address" placeholder='Address'value={formData.address} onChange={handleChange} />
              </div>
              <div className='mt-5'>
                <p className='reg font-semibold'>Already have an account? <Link to={'/login'} className='underline'>Login </Link>  </p>
              </div>
              <div className='reg-div flex justify-center drop-shadow-2xl rounded mt-4 bg-[#e6ac00]' >
                <button variant='' type="submit" className='btn h-9 text-white'>
                  Register
                </button>
              </div>
            </form>
          </div>

        </div>
        <div className='waves'>
          <Lottie animationData={waves} loop={true} />
        </div>
      </div>
    </center>
    <ToastContainer />
    </div>
  )
}

export default Register


{/*  */ }
