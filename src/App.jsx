import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import StudentApplication from "./Pages/StudentApplication";
import Profile from "./Pages/Profile";
import AdminReg from "./Admin/AdminReg";
import AdminHome from "./Admin/AdminHome";
import AdminLogin from "./Admin/AdminLogin";
import Otp from "./Pages/Otp";
import Panel from "./Pages/Panel";
import ScholarForm from "./Pages/ScholarForm";
import ListProviders from "./Pages/ListProviders";
import Provider from "./Pages/Provider";
import ScholarshipAplly from "./Pages/ScholarshipAplly";
import Panell from "./Pages/Panel2";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply/:id/:name" element={<StudentApplication />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/otp" element={<Otp />} />

        <Route path="/adminreg" element={<AdminReg />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/panel" element={<Panel />} />
        <Route path="/scholarForm" element={<ScholarForm />}/>
        <Route path="/panel2/:id" element={<Panell />} />

        <Route path="/listProviders" element={<ListProviders />} />
        <Route path="/provider/:id" element={<Provider />} />
        <Route path="/SschrolForm/:id" element={<ScholarshipAplly />} />
      </Routes>
    </>
  );
}

export default App;
