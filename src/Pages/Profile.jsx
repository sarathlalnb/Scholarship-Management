import React, { useEffect, useState } from "react";
import profileTemp from "../assets/Images/profile-temp.png";
import { FcCancel, FcOk, FcProcess } from "react-icons/fc";
import axios from "axios";
import { endpoints } from "../defualts";
import { Link } from "react-router-dom";


function Profile() {
  const [appliedScholarship, setAppliedScholarship] = useState([]);
  const [profile, setProfile] = useState({});
  const [isNotStudent, setNotStudent] = useState(true);
  const [isScholarshipProvider, setIsScholarshipProvider] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log("ertyuio");
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token");
      return;
    }

    try {
      const response = await axios.get(`${endpoints.USER_PROFILE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfile(response.data.user);
      if (response.data.user.is_student === true) {
        setNotStudent(false);
      } else if (response.data.has_scholarship_provider === true) {
        setIsScholarshipProvider(true);
      }
    } catch (error) {
      console.log(error.response ? error.response.data.detail : error.message);
    }
  };

  return (
    <div>
      <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="text-[#e6ac00] md:order-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              <li className="md:px-4 md:py-2 hover:text-[#e6ac00]">
                <a href="/">Home</a>
              </li>
              {/* Additional links can be added here */}
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex justify-center align-middle bg-slate-100 h-screen">
        <div className="mt-20 bg-white h-2/3 w-[80%] border-gray-700 shadow-lg overflow-hidden grid grid-cols-2 p-2">
          <div className="col-span-1 border-r-2 border-r-gray-200">
            <div className="h-96 bg-orange-100 w-80 rounded-3xl mt-32 ml-16 shadow-lg">
              <div className="flex justify-center">
                <img
                  src={profileTemp}
                  alt="Profile"
                  className="w-40 h-40 mt-[-43%] rounded-[50%] ring-8 ring-white shadow-2xl bg-white"
                />
              </div>

              <div className="flex flex-col items-center leading-tight mt-5">
                <div className="font-mono text-xl text-slate-600 tracking-tight font-extrabold">
                  Name : {profile.full_name}
                </div>
              </div>
              <div className="flex flex-col items-center leading-tight mt-5">
                <div className="font-mono text-xl text-slate-600 tracking-tight font-extrabold">
                  Phone : {profile.phone}
                </div>
              </div>
              <div className="flex flex-col items-center leading-tight mt-5">
                <div className="font-mono text-xl text-slate-600 tracking-tight font-extrabold">
                  Email : {profile.full_name}
                </div>
              </div>
              <div className="flex flex-col items-center leading-tight mt-5">
                {isNotStudent ? (
                  isScholarshipProvider ? (
                    <Link to={'/panel'} className="button2">Go to Panel </Link>
                  ) : (
                    <div>
                     <Link to={'/register'} className="button4">
                        Request To be a Scholarship provider
                      </Link>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 p-5 px-7">
            <h6 className="font-semibold text-[20px] border-b-[1px] border-b-orange-100 text-center">
              Activities
            </h6>
            <table className="min-w-[450px] mt-4 border-2 border-orange-100">
              <thead className="border-b-4 border-b-orange-100">
                <tr className="flex justify-between px-3 font-semibold text-md">
                  <td>#</td>
                  <td className="ml-[-80px]">Activity</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {appliedScholarship?.map((item, index) => (
                  <tr
                    key={index}
                    className="flex justify-between px-3 font-semibold text-md mt-8"
                  >
                    <td>{index + 1}</td>
                    <td>{item.scholarship_name}</td>
                    <td className="flex gap-1">
                      {item.status === "approved" && (
                        <>
                          <span>Approved</span>
                          <FcOk className="mt-1" />
                        </>
                      )}
                      {item.status === "pending" && (
                        <>
                          <span>Pending</span>
                          <FcCancel className="mt-1" />
                        </>
                      )}
                      {item.status === "processing" && (
                        <>
                          <span>Processing</span>
                          <FcProcess className="mt-1" />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
