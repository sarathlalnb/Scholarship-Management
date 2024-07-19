import React, { useState } from 'react'
import otpImage from '../assets/Images/otp.png'
import studentImage from '../assets/Images/students.png'
import './Otp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../defualts';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

function Otp() {
    const location = useLocation();
    const from = location.state?.from;
    console.log(from);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1); 
    const navigate = useNavigate();

    const handleInput = (e, index) => {
        const { value } = e.target;
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
    };

    const handleSubmitOtp = async () => {
        const otp = otpValues.join('');
        const payload = {
            email: localStorage.getItem('reqEmail'),
            otp: otp,
        };
        try {
            const response = await axios.post(endpoints.REG_VERIFY_OTP, payload);
            if (response.status === 200) {
                if(from === 'registration'){
                    console.log("wertyuio")
                    setStep(2); 
                }
                else{
                    console.log("1"); 
                    navigate('/'); 
                }
                console.log(response.data.data.data);
                localStorage.removeItem('reqEmail');
                const { token, user } = response.data.data.data;
                localStorage.setItem('token', token.access);
                localStorage.setItem('user',user.id);
                localStorage.setItem('userData',user.full_name);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('Invalid OTP');
        }
    };

    const handleStudentVerification = async (isStudent) => {
        // Handle student verification logic here
        if (isStudent) {
            const Payload = {
                is_student : "True"
            }
            const response = await axios.post(endpoints.SET_STUDENT, Payload, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
              });
            if (response.status === 200) {
                navigate('/'); 
            }
            else{
                toast.error('wrong otp')
            }
        } else {
            navigate('/'); 
    }
    };
    return (
        <>
            {step === 1 && (
                <div className='w-full h-screen bg-[#E8E8E8] grid grid-rows-1'>
                    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 h-16 px-8 md:px-auto">
                        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-center flex-wrap md:flex-nowrap">
                            <div className="text-[#e6ac00] md:order-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                            </div>
                            <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                                <ul className="flex font-semibold justify-between">
                                    <li className="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">Home</a></li>
                                    <li className="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">Search</a></li>
                                    <li className="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">Explore</a></li>
                                    <li className="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">About</a></li>
                                    <li className="md:px-4 md:py-2 hover:text-[#e6ac00]"><a href="#">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className='grid grid-cols-2'>
                        <div className='flex flex-col items-center'>
                            <p className='text-5xl mb-4 mt-24'>OTP Verification</p>
                            <img className='w-[60%] h-[60%]' src={otpImage} alt="OTP" />
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='w-[400px] h-[400px] bg-white rounded-[30px]'>
                                <div className='flex flex-col items-center'>
                                    <p className='text-2xl mb-4 mt-20'>Enter OTP code</p>
                                    <div className='flex justify-evenly space-x-5 mt-10'>
                                        {otpValues.map((_, index) => (
                                            <input
                                                key={index}
                                                type='text'
                                                maxLength='1'
                                                className='w-[50px] h-[50px] bg-gray-200 text-center text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                                onInput={(e) => handleInput(e, index)}
                                            />
                                        ))}
                                    </div>
                                    <button onClick={handleSubmitOtp} className="button mt-16">
                                        Verify OTP
                                        <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                                            <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className='w-full h-screen bg-[#E8E8E8] grid grid-rows-1'>
                    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 h-16 px-8 md:px-auto">
                        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-center flex-wrap md:flex-nowrap">
                            {/* Add your navigation items here */}
                        </div>
                    </nav>
                    <div className='grid grid-cols-2'>
                        <div className='flex flex-col items-center'>
                            <p className='text-5xl mb-4 mt-24'>Confirm Identity</p>
                            <img className='w-[60%] h-[60%]' src={studentImage} alt="Student" />
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='w-[400px] h-[400px] bg-white rounded-[30px]'>
                                <div className='flex flex-col items-center'>
                                    <p className='text-2xl mb-4 mt-20'>Are You a student?</p>
                                    <div className='flex justify-evenly space-x-5 mt-10'>
                                        <button onClick={() => handleStudentVerification(true)} className="button mt-16">
                                            Yes
                                            <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                                                <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd"></path>
                                            </svg>
                                        </button>
                                        <button onClick={() => handleStudentVerification(false)} className="button mt-16">
                                            No
                                            <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                                                <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Otp;
