import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import waves from '../waves2.json';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/home'); // Redirect to the home page or another protected route
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <center>
        <div className='bg-image'>
          <div className='flex justify-center gap-2 mt-8'>
            <FaUser className='userLogo text-black font-bold' />
            <h2 className='text-black text-[20px] font-bold'>Login</h2>
          </div>
          <div className='color-div row-auto rounded shadow mt-3'>
            <div className='mt-3'>
              <form className='mt-4 py-7' onSubmit={handleSubmit}>
                <div className='form-floating flex flex-col'>
                  <label htmlFor='username' className='-ms-52 text-slate-500'>Username</label>
                  <input
                    type='text'
                    className='form-control rounded shadow-2xl border-2 h-9'
                    id='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-floating flex flex-col mt-5'>
                  <label htmlFor='password' className='-ms-52 text-slate-500'>Password</label>
                  <input
                    type='password'
                    className='form-control rounded shadow-2xl border-2 h-9'
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
                <div className='reg-div flex justify-center drop-shadow-2xl rounded mt-4 bg-[#e6ac00]'>
                  <button variant='' type='submit' className='btn h-9'>
                    Login
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
    </>
  );
}

export default Login;
