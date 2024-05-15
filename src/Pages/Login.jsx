import Lottie from 'lottie-react'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import {  Link } from 'react-router-dom'
import waves from '../waves2.json'
function Login() {
  return (
    <>
      <center>
      <div className='bg-image '>
        <div className='flex justify-center gap-2 mt-8'>
          <FaUser className='userLogo text-black font-bold' />
          <h2 className=' text-black text-[20px] font-bold '> Login</h2>
        </div>

        <div className='color-div row-auto rounded shadow mt-3' >
          <div className=' mt-3 '>

            <form className='mt-4 py-7' >
            <div class="form-floating flex flex-col">
              <label for="floatingPassword" className=' -ms-52 text-slate-500 '>Username</label>
                <input type="type" class="form-control rounded shadow-2xl border-2 h-9" id="floatingPassword" />
              </div>

              <div class="form-floating flex flex-col mt-5">
              <label for="floatingPassword" className=' -ms-52 text-slate-500 '>Password</label>
                <input type="password" class="form-control rounded shadow-2xl border-2 h-9" id="floatingPassword" />
              </div>
              <div className='mt-7'>
                <p className='reg'>Not yet a member? <Link to={'/register'} className='underline'>Register Now</Link>  </p>
              </div>
              <div className='reg-div flex justify-center drop-shadow-2xl rounded mt-4 bg-[#e6ac00]' >
                <button variant='' type="submit" className='btn h-9 '>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='waves'>
          <Lottie animationData={waves} loop={true}/>
        </div>
      </div>
    </center>
    </>
  )
}

export default Login
