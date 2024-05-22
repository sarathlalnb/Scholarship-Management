import React from 'react'
import './Home.css'
import { FaUser } from 'react-icons/fa'
import { Button } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Link, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 500,
  bgcolor: '#EEEEEE',
  border: '#EEEEEE',
  boxShadow: 24,
  p: 4,
};

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const clickApply=()=>{
    navigate('/apply')
  }


  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#EEEEEE' }}>
      <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

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
          <div class="order-2 md:order-3">
            <Link to={'/profile'} class="px-3 py-2 bg-[#e6ac00] hover:bg-[#ffd24d] text-gray-50  flex items-center gap-2 w-[50px] h-[50px] rounded-full">
              <span><FaUser style={{ fontSize: '28px' }} />
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <h1 className='text flex justify-center text-[50px] mt-5'>
        Available Scholarships
      </h1>
      <div>
        <body class="antialiased font-sans bg-gray-200">
          <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
              <div>
                <h2 class="text-2xl font-semibold leading-tight"></h2>
              </div>
              <div class="my-2 flex sm:flex-row flex-col">
                <div class="flex flex-row mb-1 sm:mb-0">
                </div>
                <div class="block relative">
                  <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                      <path
                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                      </path>
                    </svg>
                  </span>
                  <input placeholder="Search"
                    class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
              </div>
              <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table class="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Scholarship Name
                        </th>

                        <th
                          class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                          Created at
                        </th>
                        <th
                          class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          ghfhjyh
                        </td>

                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-center text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Jan 10, 2020
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-right text-sm">
                          <Button variant="outlined" size="small" onClick={handleOpen}>
                            View
                          </Button>
                          <Button onClick={clickApply} style={{ marginLeft: '20px' }} variant="outlined" size="small">
                            Apply Now
                          </Button>


                        </td>
                      </tr>
                      <tr>
                        <td class="px-5 py-5 bg-white text-sm">
                          yuhjkkhuuhjk
                        </td>

                        <td class="px-5 py-5 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap text-center">Jan 18, 2020</p>
                        </td>
                        <td class="px-5 py-5 bg-white text-sm text-right">
                          <Button variant="outlined" size="small">
                            View
                          </Button>
                          <Button onClick={clickApply}  style={{ marginLeft: '20px' }} variant="outlined" size="small">
                            Apply Now
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span class="text-xs xs:text-sm text-gray-900">
                      Showing 1 to 4 of 50 Entries
                    </span>
                    <div class="inline-flex mt-2 xs:mt-0">
                      <button
                        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                        Prev
                      </button>
                      <button
                        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >

        <Fade in={open}>
          <Box sx={style}>
            <h6 className='font-semibold text-3xl border-b-2 border-b-slate-400 p-2 border-w'>
              Scholarship Details
            </h6>
            <div className=' grid grid-cols-2 p-4 mt-6'>

              <div className='col-span-1 border-r-2 border-r-slate-400 p-4 w-[200px]'>
                <p className='font-semibold mb-6 text-lg'>Scholarship name </p>
                <p className='font-semibold mb-6 text-lg'>Description </p>
                <p className='font-semibold mb-6 text-lg'>Eligibility </p>
                <p className='font-semibold mb-6 text-lg'>Amount </p>
                <p className='font-semibold mb-6 text-lg'>Duration </p>
                <p className='font-semibold mb-6 text-lg'>Deadline </p>
              </div>
              <div className='col-span-1 p-4'>
              <p className='font-semibold mb-6 text-lg'>Scholarship name </p>
                <p className='font-semibold mb-6 text-lg'>Description </p>
                <p className='font-semibold mb-6 text-lg'>Eligibility </p>
                <p className='font-semibold mb-6 text-lg'>Amount </p>
                <p className='font-semibold mb-6 text-lg'>Duration </p>
                <p className='font-semibold mb-6 text-lg'>Deadline </p>
              </div>

              <hr />
            </div>
            <Button style={{ marginLeft: '680px', marginTop: '20px' }} variant="outlined" size="small" className='button w-28 h-12 '>
              APPLY NOW
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default Home
