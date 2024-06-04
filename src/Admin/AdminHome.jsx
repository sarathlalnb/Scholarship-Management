import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { duration, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Fade, Modal } from '@mui/material';
import Swal from 'sweetalert2';
import { FcBusinessman, FcGraduationCap } from "react-icons/fc";
import { IoMailUnread } from 'react-icons/io5';
import Backdrop from '@mui/material/Backdrop';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#454a6e',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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


const AdminHome = () => {
  const [formData, setFormData] = useState({
    name: '',
    eligibility: '',
    amount:'',
    duration:'',
    deadline:'',
    description:''
  });
  const [selectedContent, setSelectedContent] = useState('Content for Add Scholarship');
  const [listitem,setListitem]=useState([]);
  const [applications,setApplications] = useState([])
  const [open, setOpen] = React.useState(false);
  const [data,setData] = useState({})
  const handleOpen = (items) =>{
    setOpen(true);
    setData(items)
  } 
  const handleClose = () => {
    setOpen(false);
  setData(null)
}

  const handleColumnClick = (content) => {
    setSelectedContent(content);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " You need to be logged in to submit the form",
    });
      return;
  } 

    console.log('Token:',token); 
    try {
      const response = await axios.post( 'http://127.0.0.1:8000/AddScholarship/', formData,
        {
          
          headers: {
            Authorization: `Token ${token}`, // Include token in headers
          },
        }
      );
      

      console.log(response.data); 
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Application submitted succesfully",
        showConfirmButton: false,
        timer: 4000
    });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getListitems = async () => { 
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " You need to be logged in to submit the form",
    });
      return;
  } 
    try {
      const response = await axios.get('http://127.0.0.1:8000/list_scholarshipbyadmin/',listitem,
      {
          headers: { Authorization: `Token ${token}`}
      });
         console.log(response.data); 
         setListitem(response.data);
   
         /*  
          Swal.fire({
        position: "center", icon: "success", title: "Application submitted succesfully", showConfirmButton: false, timer: 4000
          });
                 */
    } catch (error) {
      console.error('Error:', error);
    }};

    //list all applied scholarships 

    const appliedScholarships = async ()=>{
      const token = localStorage.getItem('token')
      if(!token){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " You need to be logged in to submit the form",
      });
      return;
      }
     
      try {
        const response = await axios.get('http://127.0.0.1:8000/application_viewset/',{
          headers:{
            Authorization:`Token ${token}`,
            "Content-Type":"application/json"
          }
        }  , applications)
         console.log(response.data)
         setApplications(response.data)
      } catch (error) {
        console.log('cannot fetch applications' , error);
      }
    }

  useEffect(() => {
    getListitems();
    appliedScholarships();
  },[]);

  return (
    <>
    <div className='bg-[#2d3250] w-full h-screen fixed'>
      <div className='w-full h-24 bg-[#31354e] border-b-2 p-6 border-b-[#6b6d77b4]'>
        <div className='flex justify-start text-[#e6ac00] ms-40'>

            <svg xmlns="http://www.w333.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
            </svg>

          <div className='text-slate-50 ms-5 text-3xl font-mono mt-1'>Scholar Hub</div>
        </div>
        <div className='flex justify-end m-[-29px] ms-40'>
          <div className='pe-10'><Avatar>A</Avatar></div>
          <div className='pe-10 text-lg font-semibold text-slate-200 pt-2 me-5'>Admin Name</div>
        </div>
      </div>

      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0.3}>
            <Grid xs={4} md={3} lg={2}>
              <Item className='h-screen'>
                <div>
                  <div className='flex flex-col'>
                    <div 
                      className='p-5 text-slate-50 bg-[#454a6e] border-b-2 border-b-[#535660] hover:bg-[#575e8b]' 
                      onClick={() => handleColumnClick('Content for Add Scholarship')}>
                      Add Scholarship
                    </div>
                    <div 
                      className='p-5 text-slate-50 bg-[#454a6e] border-b-2 border-b-[#535660] hover:bg-[#575e8b]' 
                      onClick={() => handleColumnClick('Content for List')}>
                      List
                    </div>
                    <div 
                      className='p-5 text-slate-50 bg-[#454a6e] border-b-2 border-b-[#535660] hover:bg-[#575e8b]' 
                      onClick={() => handleColumnClick('Content for cccccc')}>
                     All Applications
                    </div>
                  </div>
                </div>
              </Item>
            </Grid>
            <Grid xs={8} md={9} lg={10}>
              <Item className='h-screen overflow-auto'>
                <div >
                  {selectedContent === 'Content for Add Scholarship' ? (
                    <section className="bg-white dark:bg-gray-900 ">
                      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 ">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Scholarship</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="grid gap-6 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                              <input type="text" name="name" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                               value={formData.name}
                               onChange={handleChange} placeholder="Scholarship Name" required/>
                            </div>
                            <div className="w-full">
                              <label htmlFor="eligibility" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Eligibility</label>
                              <input type="text" name="eligibility" id="eligibility" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formData.eligibility}
                                onChange={handleChange}  placeholder="Eligibility" required/>
                            </div>
                            <div className="w-full">
                              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                              <input type="number" name="amount" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formData.amount}
                                onChange={handleChange}  placeholder="$2999" required/>
                            </div>
                            <div>
                              <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                              <input type="text" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formData.duration}
                                onChange={handleChange} 
                                 placeholder="Duration in years" required/>
                            </div>
                            <div>
                              <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
                              <input
                                  type="text"
                                  name="deadline"
                                  id="deadline"
                                  className="
                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                    dark:focus:ring-primary-500 dark:focus:border-primary-500
                                  "
                                  placeholder="YYYY-MM-DD"
                                  pattern="\d{4}-\d{2}-\d{2}"
                                  required
                                  value={formData.deadline}
                                  onChange={handleChange} 
                                />                            </div>
                            <div className="sm:col-span-2">
                              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                              <textarea id="description" name='description' rows="7" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                value={formData.description}
                                onChange={handleChange} 
                                required
                              placeholder="Your description here"></textarea>
                            </div>
                          </div>
                          <button type="submit" className="inline-flex items-center bg-slate-600 px-5 py-2.5 mt-4 mb-20 sm:mt-6 text-sm font-semibold text-center text-white bg-white-200 rounded-lg  focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-slate-100 hover:text-slate-800 ">
                            Add Scholarship
                          </button>
                        </form>
                      </div>
                    </section>      



                  ) :  selectedContent === 'Content for List' ? (
                    <div>
                      <section className="w-[100%] h-[85vh] bg-gray-800 
                      dark:bg-gray-800 overflow-auto p-2 
                      "> 
                      <div>
                        <div>
                            <div className='text-4xl font-bold font-serif text-slate-100 mb-9 mt-5'>
                              Available Scholarships
                            </div>
                          <Grid container   >
                          {listitem.map((item,index) => (
                               <Grid container item key={index} lg={4} md={3} xs={4} xs:w-20 truncate >
                                 <div className='w-screen h-80'>
                                  <Card className='m-2'>  
                                      <CardActionArea>
                                        <CardContent>
                                         <Typography  gutterBottom variant="h5" component="div">
                                           {item.name}
                                         </Typography>
                                         <Typography className=''  variant="body2" color="text.secondary">
                                          <div className='mb-2 text-center text-lg'>
                                          {item.description}
                                          </div>
                                         </Typography >
                                         <div className='flex justify-center font-bold text-lg'>
                                         Eligibility : {item.eligibility}
                                         </div>
                                         <div  className='flex justify-center font-bold text-lg'>
                                         Amount : {item.amount}
                                         </div>
                                         <div  className='flex justify-center font-bold text-lg'>
                                         Duration : {item.duration}
                                         </div>
                                         <div  className='flex justify-center font-bold text-lg'>
                                         Deadline : {item.deadline}
                                         </div>
                                        </CardContent>
                                      </CardActionArea>
                                  </Card>
                                </div>
                               </Grid>
                              ))}
                          </Grid>
                       </div>
                         </div> </section>
                    </div>
                  ): selectedContent === 'Content for cccccc' ? (
                    <div className="text-white">
                      <h2 className="text-xl  mb-4"> Content</h2>
                      
                        <div className='bg-slate-900 p-5 h-[85vh] w-full fixed rounded-lg overflow-auto px-[250px]'>
                           <div>
                                 {
                                  applications.map((item,index)=>(
                                    <div key={index}>
                                         <div className='border-2 rounded-lg bg-white w-[600px] h-[200px] mb-6 p-4'>
                                      <div className='flex mb-5 border-b-2 py-2'>
                                      <FcBusinessman style={{
                                          fontSize:'25px',
                                         }}/>
                                       <h1 className='text-black mt-1 ml-2 font-semibold text-[18px]'> {item.name}</h1> 
                                      </div>

                                      <div className='flex mb-6'>
                                      <FcGraduationCap  style={{
                                          fontSize:'25px',
                                         }} />
                                      <h1 className='text-black mt-0 ml-2 font-semibold text-[18px]'> {item.scholarship}</h1> 
                                      </div>

                                      <div className='flex'>
                                      <IoMailUnread   style={{
                                          fontSize:'25px',
                                          color:'#8f8f8f'
                                         }} />
                                      <h1 className='text-black mt-0 ml-2 font-semibold text-[18px]'> {item.email}</h1> 
                                      </div>

                                      <button className='font-semibold mt-5 text-blue-700' onClick={handleOpen}>More Details</button>
                                          </div>
                                        </div>
                                   ))}

                            
                           </div>
                      </div>

                    </div>
                  ): (
                    <div className="text-white">{selectedContent}</div>
                  )}
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>

        
      </div>
      <ToastContainer />
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
          <Box  sx={style}>
     <p className='text-black'>   Name : {data?.name}</p>
          </Box>
        </Fade>
      </Modal>
    
    </>
  );
};

export default AdminHome;
