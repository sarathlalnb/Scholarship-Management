import React, { useState } from 'react'
import './StudentApplication.css'
import axios from 'axios';

function StudentApplication() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        applicationDate: '',
        scholarship: '',
        certificate: null,
        identity: null,
        photo: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);

        const token = localStorage.getItem('token'); // Assume token is stored in localStorage
        console.log("Token retrieved from localStorage:", token);

        if (!token) {
            alert("You need to be logged in to submit the form");
            return;
        }

        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('applicationDate', formData.applicationDate);
        data.append('scholarship', formData.scholarship);
        data.append('certificate', formData.certificate);
        data.append('identity', formData.identity);
        data.append('photo', formData.photo);

        try {
            const response = await axios.post('http://127.0.0.1:8000/applyscholarship/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`
                }
            });
            alert('Application submitted successfully');
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            alert('Failed to submit the application');
        }
    };

    return (
        <div style={{ width: '100%', height: '140vh', backgroundColor: '#EEEEEE' }}>
            <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
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
            <div className='flex justify-center'>
                <h1 className='text text-[50px] mt-5'>Application Form</h1>
            </div>
            <div className='ms-96 rounded-2xl mt-5' style={{ width: '40%', height: '90vh', backgroundColor: 'white' }}>


                <form className="max-w-md mx-auto py-10" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="fullName"
                            id="floating_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Full Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email address
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            name="phone"
                            id="floating_phone"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phone number
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="date"
                            name="applicationDate"
                            id="floating_application_date"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                            value={formData.applicationDate}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="floating_application_date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Application date
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="scholarship"
                            id="floating_scholarship"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.scholarship}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="floating_scholarship" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Scholarship
                        </label>
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="max-w-lg mx-auto">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="certificate">Certificate</label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="certificate_help"
                                id="certificate"
                                name="certificate"
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <div className="max-w-lg mx-auto">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="identity">Identity</label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="identity_help"
                                id="identity"
                                name="identity"
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <div className="max-w-lg mx-auto">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="photo">Photo</label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="photo_help"
                                id="photo"
                                name="photo"
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="mt-10 ms-48 text-white bg-[#E6AC00] focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Submit
                    </button>
                </form>

            </div>

        </div>
    )
}

export default StudentApplication