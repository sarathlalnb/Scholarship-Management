import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import Lottie from 'lottie-react'
import waves from './adreg.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adregister from '../assets/Images/adregister.png'
import { Link, useNavigate } from 'react-router-dom';


function AdminReg() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
      });

        // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const naviagate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData); 

    try {
    //   const response = await axios.post('http://127.0.0.1:8000/st_reg/', formData);
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
    <div className=''>    <center>
      <div className='ad-bg-image '>
        {/* <div className='flex justify-center gap-2 mt-3'>
          <FaUser className='userLogo text-black font-bold' />
          <h2 className=' text-black text-[20px] font-bold '> Register</h2>
        </div> */}

        <div className='color-div row-auto rounded-lg bg-[#424769] lg:grid grid-cols-2 sm:grid-cols-2  mt-3 py-5 shadow-2xl overflow-auto'  >
          <div className='col-span-1 border-r-2 border-r-[#f9b17a]'>
            <h1 className='font-bold text-[#f9b17a] text-3xl border-b-2 border-b-[#2d3250]  w-48 mt-5'>Welcome<span className='text-slate-500'>!</span></h1>
            <p className='font-thin mt-4 text-slate-200'>Lorem ipsum dolor sit <br /> amet consectetur, adipisicing elit . <br /> Ab laborum modi a, d</p>
            <img className='w-80 mt-3' src={adregister} alt="" />
          </div>

          <div className='col-span-1 mt-3 '>
            <form className='mt-20 ' onSubmit={handleSubmit}  >
              <div class="form-floating flex flex-col">
                <input type="text" class="form-control rounded shadow-2xl border-2 border-[#2d3250] h-9 p-2" id="usernameid" name="username" placeholder='Username' value={formData.username} onChange={handleChange} />
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="email" class="form-control rounded shadow-2xl border-2 border-[#2d3250] h-9 p-2" id="emailid" name="email" placeholder='E-mail' value={formData.email} onChange={handleChange}/>
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="password" class="form-control rounded shadow-2xl border-2 border-[#2d3250] h-9 p-2" id="passwordid" name="password" placeholder='Password'value={formData.password} onChange={handleChange} />
              </div>

              <div className='mt-5 -ms-20'>
                <p className='reg font-semibold text-slate-200'>Already have an account? <Link to={'/login'} className='underline hover:text-slate-400'>Login </Link>  </p>
              </div>
              <div className='reg-div flex justify-center drop-shadow-2xl rounded mt-4 ms-2 bg-[#f9b17a]' >
                <button variant='' type="submit" className='btn h-9 text-slate-800 hover:text-lg hover:text-slate-200 hover:font-bold'>
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

export default AdminReg