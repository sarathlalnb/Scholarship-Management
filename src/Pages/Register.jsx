import Lottie from 'lottie-react'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import waves from '../waves2.json'

function Register() {
  return (
    <div>    <center>
      <div className='bg-image'>
        <div className='flex justify-center gap-2 mt-3'>
          <FaUser className='userLogo text-black font-bold' />
          <h2 className=' text-black text-[20px] font-bold '> Register</h2>
        </div>

        <div className='color-div row-auto rounded-lg lg:grid grid-cols-2 shadow mt-3 py-5' >
          <div className='col-span-1 border-r-2 border-r-yellow-50'>
            <h1>HII</h1>
          </div>

          <div className='col-span-1 mt-3 '>

            <form className='mt-2 ' >
              <div class="form-floating flex flex-col">
                <input type="text" class="form-control rounded shadow-2xl border-2 border-gray-100 h-9 p-2" id="floatingPassword" placeholder='Username' />
              </div>

              <div class="form-floating flex flex-col mt-3">
                <input type="text" class="form-control rounded shadow-2xl border-2  border-gray-100 h-9 p-2" id="floatingPassword" placeholder='First name' />
              </div>

              <div class="form-floating flex flex-col mt-3">
                <input type="text" class="form-control rounded shadow-2xl border-2  border-gray-100 h-9 p-2" id="floatingPassword" placeholder='Last name' />
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="email" class="form-control rounded shadow-2xl border-2  border-gray-100 h-9 p-2" id="floatingPassword" placeholder='E-mail' />
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="password" class="form-control rounded shadow-2xl border-2  border-gray-100 h-9 p-2" id="floatingPassword" placeholder='Password' />
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="number" class="form-control rounded shadow-2xl border-2 h-9 p-2  border-gray-100" id="floatingPassword" placeholder='Phone' />
              </div>
              <div class="form-floating flex flex-col mt-3">
                <input type="text-area" class="form-control rounded shadow-2xl border-2 h-9 p-2  border-gray-100" id="floatingPassword" placeholder='Address' />
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
    </center></div>
  )
}

export default Register


{/*  */ }