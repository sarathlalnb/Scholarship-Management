import React, { useState } from 'react'
import otp from '../assets/Images/otp.png'
import './Otp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Otp() {
    const [otpValues, setOtpValues] = useState(['', '', '', '','','']);
    const [error, setError] = useState(null);
const navigate = useNavigate();
    const handleInput = (e, index) => {
        const { value } = e.target;
        console.log(value,index)
        
         const newOtpValues = [...otpValues];
         newOtpValues[index] = value;

         setOtpValues(newOtpValues);

    
        
        
    };

    const handleSubmit = async () => {
        const otp = otpValues.join('');
        const payload = {
            username : sessionStorage.getItem('username'),
            otp : otp,
        }
        console.log(otp);
        try {
            const response = await axios.post('http://127.0.0.1:8000/verify-otp/',payload);
            console.log('Server response:', response); // Debugging step
    
            if (response.status == 200) {

            sessionStorage.removeItem('username');
            const {token,data}= response.data;
            localStorage.setItem('token',token);
            localStorage.setItem('data',data);
            localStorage.setItem('username',data.username);
            localStorage.setItem('userId',data.id);
                navigate('/home'); // Correct function name for navigation
            }
           
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('Invalid OTP');
        }
    };


    return (
        <>
            <div className='w-full h-screen bg-[#E8E8E8] grid grid-rows-1'>
                <nav class="bg-gray-200 shadow shadow-gray-300 w-100 h-16 px-8 md:px-auto">
                    <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-center flex-wrap md:flex-nowrap">

                        <div class="text-[#e6ac00] md:order-1">

                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
                            <ul class="flex font-semibold justify-between">

                                <li class="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">Home</a></li>
                                <li class="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">Search</a></li>
                                <li class="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">Explore</a></li>
                                <li class="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">About</a></li>
                                <li class="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">Contact</a></li>
                            </ul>
                        </div>

                    </div>
                </nav>
                <div className='grid grid-cols-2'>
                    <div className='flex flex-col items-center '>
                        <p className='text-5xl mb-4 mt-24 '>OTP Verification</p>
                        <img className='w-[60%] h-[60%]' src={otp} alt="OTP" />
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='w-[400px] h-[400px] bg-white rounded-[30px]'>
                            <div className='flex flex-col items-center '>
                                <p className='text-1 text-2xl mb-4 mt-20'>Enter OTP code</p>
                                <div className='flex justify-evenly space-x-5 mt-10'>
                                    <input
                                        type='text'
                                        maxLength='1'
                                        
                                        className='w-[50px] h-[50px] bg-gray-200 text-center text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                        onInput={(e) => handleInput(e, 0)}
                                    />
                                    <input
                                        type='text'
                                        maxLength='1'
                                        className='w-[50px] h-[50px] bg-gray-200 text-center text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                        onInput={(e) => handleInput(e, 1)}
                                    />
                                    <input
                                        type='text'
                                        maxLength='1'
                                        className='w-[50px] h-[50px] bg-gray-200 text-center text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                        onInput={(e) => handleInput(e, 2)}
                                    />
                                    <input
                                        type='text'
                                        maxLength='1'
                                        className='w-[50px] h-[50px] bg-gray-200 text-center text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                        onInput={(e) => handleInput(e, 3)}
                                    />
                                     <input
                                        type='text'
                                        maxLength='1'
                                        className='w-[50px] h-[50px] bg-gray-200 text-center text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                        onInput={(e) => handleInput(e, 4)}
                                    />
                                    <input
                                        type='text'
                                        maxLength='1'
                                        className='w-[50px] h-[50px] bg-gray-200 text-center text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                        onInput={(e) => handleInput(e, 5)}
                                    />
                                </div>
                                <button onClick={handleSubmit} class="button mt-16">
                                    Verify OTP
                                    <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                                        <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

export default Otp