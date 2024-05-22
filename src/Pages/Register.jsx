import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import waves from '../waves2.json';
import axios from 'axios';

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
    console.log('Form data before submission:', formData); // Log form data

    try {
      const response = await axios.post('http://127.0.0.1:8000/st_reg/', formData);
      console.log('Response from the server:', response.data); 
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div>
      <center>
        <div className='bg-image'>
          <div className='flex justify-center gap-2 mt-8'>
            <FaUser className='userLogo text-black font-bold' />
            <h2 className='text-black text-[20px] font-bold'>Register</h2>
          </div>
          <div className='color-div row-auto rounded shadow mt-3'>
            <div className='mt-3'>
              <form className='mt-4 py-7' onSubmit={handleSubmit}>
                <div className="form-floating flex flex-col">
                  <label htmlFor="username" className='-ms-52 text-slate-500'>Username</label>
                  <input
                    type="text"
                    className="form-control rounded shadow-2xl border-2 h-9"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col">
                  <label htmlFor="firstname" className='-ms-52 text-slate-500'>Firstname</label>
                  <input
                    type="text"
                    className="form-control rounded shadow-2xl border-2 h-9"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col">
                  <label htmlFor="lastname" className='-ms-52 text-slate-500'>Lastname</label>
                  <input
                    type="text"
                    className="form-control rounded shadow-2xl border-2 h-9"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col mt-5">
                  <label htmlFor="email" className='-ms-60 text-slate-500'>E Mail</label>
                  <input
                    type="email"
                    className="form-control rounded shadow-2xl border-2 h-9"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col mt-5">
                  <label htmlFor="password" className='-ms-52 text-slate-500'>Password</label>
                  <input
                    type="password"
                    className="form-control rounded shadow-2xl border-2 h-9"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col">
                  <label htmlFor="phone" className='-ms-52 text-slate-500'>Phone Number</label>
                  <input
                    type="text"
                    className="form-control rounded shadow-2xl border-2 h-9"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col">
                  <label htmlFor="address" className='-ms-52 text-slate-500'>Address</label>
                  <input
                    type="text"
                    className="form-control rounded shadow-2xl border-2 h-9"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-5'>
                  <p className='reg'>Already have an account? <Link to={'/login'} className='underline'>Login</Link></p>
                </div>
                <div className='reg-div flex justify-center drop-shadow-2xl rounded mt-4 bg-[#e6ac00]'>
                  <button variant='' type="submit" className='btn h-9'>
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
    </div>
  );
}

export default Register;
