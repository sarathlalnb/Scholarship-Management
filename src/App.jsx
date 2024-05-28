
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Landing from './Pages/Landing'
import StudentApplication from './Pages/StudentApplication'
import Profile from './Pages/Profile'
import AdminReg from './Admin/AdminReg'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/apply/:name' element={<StudentApplication/>}/>
      <Route path='/profile' element={<Profile/>}/>

      <Route path='/adminreg' element={<AdminReg/>}/>

    </Routes>
    </>
  )
}

export default App
