import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import waves from "../waves3new.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import register from "../assets/Images/register.jpg";
import { endpoints } from "../defualts";
import Loader from "./Loader";


function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    dob: "",
    email: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submission:", formData);
    localStorage.setItem("reqEmail", formData.email);
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post(endpoints.REGISTER, formData);
      console.log("Response from the server:", response.data);
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate('/otp', { state: { from: 'registration' } });
      }, 2000);
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Error submitting the form!");
    } finally {
      setLoading(false); // Set loading to false after the response is received
    }
  };

  return (
    <div>
      <center>
        <div className="bg-image">
          <div className="color-div row-auto rounded-lg lg:grid grid-cols-2 mt-3 py-5 shadow-2xl">
            <div className="col-span-1 border-r-2 border-r-yellow-50">
              <h1 className="font-bold text-3xl border-b-2 border-b-[#e6ac00] w-48 mt-5">
                Welcome<span className="text-[#e6ac00]">!</span>
              </h1>
              <p className="font-thin mt-4">
                Lorem ipsum dolor sit <br /> amet consectetur, adipisicing elit
                . <br /> Ab laborum modi a, d
              </p>
              <img className="w-72 mt-4" src={register} alt="Register" />
            </div>

            <div className="col-span-1 mt-3">
              <form className="mt-2" onSubmit={handleSubmit}>
                <div className="form-floating flex flex-col mt-3">
                  <input
                    type="text"
                    className="form-control rounded shadow-2xl border-2 h-9 p-2 border-gray-100"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-floating flex flex-col mt-3">
                  <input
                    type="email"
                    className="form-control rounded shadow-2xl border-2 border-gray-100 h-9 p-2"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col mt-3">
                  <input
                    type="password"
                    className="form-control rounded shadow-2xl border-2 border-gray-100 h-9 p-2"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col mt-3">
                  <input
                    type="number"
                    className="form-control rounded shadow-2xl border-2 h-9 p-2 border-gray-100"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-floating flex flex-col mt-3">
                  <input
                    type="text"
                    className="form-control rounded shadow-2xl border-2 h-9 p-2 border-gray-100"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-floating mt-3">
                  <label className="rounded shadow-2xl border-2 border-gray-100 h-9 p-2">
                    Dob
                  </label>
                  <input
                    type="date"
                    className="form-control rounded shadow-2xl border-2 border-gray-100 h-9 p-2"
                    name="dob"
                    placeholder="Dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-5 -ms-20">
                  <p className="reg font-semibold">
                    Already have an account?{" "}
                    <Link to={"/login"} className="underline">
                      Login
                    </Link>
                  </p>
                </div>
                <div className="reg-div flex justify-center drop-shadow-2xl rounded mt-4 ms-2 bg-[#e6ac00]">
                  <button type="submit" className="btn h-9 text-white w-">
                    {loading ? <Loader /> : "Register"} 
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="waves">
            <Lottie animationData={waves} loop={true} />
          </div>
        </div>
      </center>
      <ToastContainer />
    </div>
  );
}

export default Register;
