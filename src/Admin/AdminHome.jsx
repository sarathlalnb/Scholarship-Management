import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { duration, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#454a6e',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    try {
      const response = await axios.post('http://127.0.0.1:8000/AddScholarship/', formData);
      console.log(response.data); 
    } catch (error) {
      console.error('Error:', error);
 
    }
  };
  
  return (
    <div className='bg-[#2d3250] w-full h-screen fixed'>
      <div className='w-full h-24 bg-[#31354e] border-b-2 p-8 border-b-[#6b6d77b4]'>
        <div className='flex justify-start ms-40'>
          <div className='pe-5 text-slate-50'>logo</div>
          <div className='text-slate-50'>Name</div>
        </div>
        <div className='flex justify-end m-[-25px] ms-40'>
          <div className='pe-10'><Avatar>A</Avatar></div>
          <div className='pe-10 text-lg font-semibold text-slate-200 pt-2'>Admin Name</div>
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
                      cccccc
                    </div>
                  </div>
                </div>
              </Item>
            </Grid>
            <Grid xs={8} md={9} lg={10}>
              <Item className='h-screen'>
                <div>
                  {selectedContent === 'Content for Add Scholarship' ? (
                    <section className="bg-white dark:bg-gray-900">
                      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Scholarship</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="grid gap-6 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                              <input type="text" name="name" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                               value={formData.name}
                               onChange={handleChange} placeholder="Scholarship Name" required=""/>
                            </div>
                            <div className="w-full">
                              <label htmlFor="eligibility" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Eligibility</label>
                              <input type="text" name="eligibility" id="eligibility" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formData.eligibility}
                                onChange={handleChange}  placeholder="Eligibility" required=""/>
                            </div>
                            <div className="w-full">
                              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                              <input type="number" name="amount" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formData.amount}
                                onChange={handleChange}  placeholder="$2999" required=""/>
                            </div>
                            <div>
                              <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                              <input type="text" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formData.duration}
                                onChange={handleChange} 
                                 placeholder="Duration in years" required=""/>
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
                              placeholder="Your description here"></textarea>
                            </div>
                          </div>
                          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-200 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-slate-600">
                            Add Scholarship
                          </button>
                        </form>
                      </div>
                    </section>      
                  ) : (
                    <div className="text-white">
                      <div>

                      </div>
                    </div>
                  )}
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminHome;
