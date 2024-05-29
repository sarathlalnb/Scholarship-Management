import React from 'react'
import Avatar from '@mui/material/Avatar';



function AdminHome() {
  return (
    <div className='bg-[#2d3250] w-full h-screen fixed'>
        <div className='w-full h-24 bg-[#31354e] border-b-2 p-8 border-b-[#6b6d77b4]' >
            <div className='flex  justify-start  ms-40'>
             <div className='pe-5  text-slate-50' >logo</div>
             <div className='text-slate-50'> Name </div>
    </div>
        <div className='flex  justify-end  m-[-25px] ms-40'>
                <div className='pe-10' > <Avatar>A</Avatar> </div>
                <div className='pe-10 text-lg font-semibold text-slate-200 pt-2'> Admin Name  </div>
            </div>    
        </div>  

        <div className='w-80 h-screen  bg-[#424769]'> 
          <div className='flex-row'>
             <div className='h-20 w-full flex  justify-around p-5 text-slate-50 bg-[#454a6e] border-b-2 border-b-[#535660] hover:bg-[#575e8b]'>aaaaaa</div>
             <div className='h-20 w-full flex  justify-around p-5 text-slate-50 bg-[#454a6e] border-b-2 border-b-[#535660] hover:bg-[#575e8b]'>bbbbbb</div>
         </div>
          </div>
    </div>
  )
}

export default AdminHome