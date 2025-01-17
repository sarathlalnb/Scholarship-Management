import React, { useEffect, useRef, useState } from "react";
import "./Landing.css";
import pic1 from "../assets/Images/pic1.png";
import pic2 from "../assets/Images/pic2.jpg";
import pic3 from "../assets/Images/pic6.jpg";
import pic4 from "../assets/Images/pic4.jpg";
import pic5 from "../assets/Images/pic5.jpg";
import AOS from "aos";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { MdFlight } from "react-icons/md";
import { FaBookOpen, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../defualts";

function Landing() {
  const aboutUsRef = useRef(null);
  useEffect(() => {
    getProfile();
  }, []);

  const [student, setStudent] = useState(false);
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
      if (response.data.user.is_student === true) {
        setStudent(true);
      }
    } catch (error) {
      console.log(error.response ? error.response.data.detail : error.message);
    }
  };

  const scrollToAbout = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const token = localStorage.getItem("token");
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in-out",
      once: false,
    });

    if (token) {
      setLogged(true);
    }
  }, [token]);

  return (
    <div>
      <div>
        <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
          <div>
            {logged ? (
              <div>
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                  <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                    <ul className="flex font-semibold justify-between">
                      <li className="md:px-4 md:py-2 hover:text-[#e6ac00]">
                        <a href="/">Home</a>
                      </li>
                      {student ? (
                        <li className="md:px-4 md:py-2 hover:text-[#e6ac00]">
                          <a href="/listProviders">List Providers</a>
                        </li>
                      ) : (
                        ""
                      )}
                      {/* <li className="md:px-4 md:py-2 hover:text-[#e6ac00]">
              <a href="#">Explore</a>
            </li>
            <li className="md:px-4 md:py-2 hover:text-[#e6ac00]">
              <a href="#">About</a>
            </li>
            <li className="md:px-4 md:py-2 hover:text-[#e6ac00]">
              <a href="#">Contact</a>
            </li> */}
                    </ul>
                  </div>
                  <Link to={"/login"} className="button1">
                    Logout
                  </Link>
                  <div class="order-2 md:order-3">
                    <Link
                      to={"/profile"}
                      class="px-3 py-2 bg-[#e6ac00] hover:bg-[#ffd24d] text-gray-50  flex items-center gap-2 w-[50px] h-[50px] rounded-full"
                    >
                      <span>
                        <FaUser style={{ fontSize: "28px" }} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
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

                  {/* <div>
                    <Link
                      to="/adminlogin"
                      className="px-4 py-2 bg-[#e6ac00] hover:bg-[#ffd24d] text-gray-50 rounded-xl flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 10 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Authorised Login</span>
                    </Link>
                  </div> */}
                  <div className="order-2 md:order-3">
                    <Link
                      to="/login"
                      className="px-4 py-2 bg-[#e6ac00] hover:bg-[#ffd24d] text-gray-50 rounded-xl flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Login</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
      <div
        style={{ width: "100%", height: "89vh", backgroundColor: "#EEEEEE" }}
        className="grid grid-cols-2 max-md:grid-cols-1"
      >
        <div className="col-span-1 grid place-items-center px-9">
          <div>
            <h1 className="text-1 text-[55px] ">
              Free <span style={{ color: "#e6ac00" }}>Scholarship</span> for
              every bright students
            </h1>
            <div className="flex ">
              <Link to={"/register"} className="button1 px-1">
                Get started
              </Link>
              <button onClick={scrollToAbout} className="button2">
                Learn More{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 grid place-items-center">
          <div className=" ">
            <img
              src={pic1}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div
        className="py-9"
        ref={aboutUsRef}
        style={{ width: "100%", backgroundColor: "#EEF7FF" }}
      >
        <h1
          style={{ color: "#e6ac00" }}
          className="text-1 text-[40px] px-10 py-24"
        >
          About Us
        </h1>
        <p style={{ marginTop: "-80px" }} className="text-1 text-[35px] px-10">
          Free Scholarship provider by schdent
        </p>
        <div className="flex justify-evenly flex-wrap">
          <div class="card mt-14">
            <div class="card-overlay"></div>
            <div class="card-inner grid">
              <div className="flex justify-center self-center">
                <PiBuildingOfficeFill
                  style={{ fontSize: "50px", color: "#e6ac00" }}
                />
              </div>
              <div className="mt-[-100px]">Full College Cost</div>
            </div>
          </div>
          <div class="card mt-14">
            <div class="card-overlay"></div>
            <div class="card-inner grid">
              <div className="flex justify-center self-center">
                <MdFlight style={{ fontSize: "50px", color: "#e6ac00" }} />
              </div>
              <div className="mt-[-100px]">Transportation Cost</div>
            </div>
          </div>
          <div class="card mt-14">
            <div class="card-overlay"></div>
            <div class="card-inner grid">
              <div className="flex justify-center self-center">
                <FaBookOpen style={{ fontSize: "50px", color: "#e6ac00" }} />
              </div>
              <div className="mt-[-100px]">Learning Equipments</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 my-20">
          <div className="col-span-1 mx-auto">
            <div className="flex">
              <div
                data-aos="fade-right"
                style={{ width: "180px", height: "250px", overflow: "hidden" }}
              >
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={pic2}
                  alt=""
                />
              </div>
              <div
                data-aos="fade-up-left"
                style={{ width: "250px", height: "190px", overflow: "hidden" }}
                className=" ms-5 mt-5"
              >
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={pic4}
                  alt=""
                />
              </div>
            </div>
            <div className="flex">
              <div
                data-aos="fade-down-right"
                style={{ width: "250px", height: "190px", overflow: "hidden" }}
                className=" mt-5"
              >
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={pic3}
                  alt=""
                />
              </div>
              <div
                data-aos="fade-up-left"
                style={{ width: "180px", height: "250px", overflow: "hidden" }}
                className=" ms-5 mt-[-25px]"
              >
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={pic5}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-span-1  ms-32">
            <h1 style={{ color: "#e6ac00" }} className="text-1 text-[40px] ">
              Platform
            </h1>
            <p className="text-1 text-[35px]">
              An educational service with <br />
              rapid development
            </p>
            <div className="flex justify-evenly mt-5">
              <div className="ms-[-100px]">
                <h1
                  style={{ color: "#e6ac00" }}
                  className="text-1 text-[30px] "
                >
                  1050+
                </h1>
                <p className="text-1 text-[15px] font-semibold">Scholarships</p>
              </div>
              <div>
                <h1 style={{ color: "#e6ac00" }} className="text-1 text-[30px]">
                  3500+
                </h1>
                <p className="text-1 text-[15px] font-semibold">Institutions</p>
              </div>
              <div>
                <h1 style={{ color: "#e6ac00" }} className="text-1 text-[30px]">
                  500+{" "}
                </h1>
                <p className="text-1 text-[15px] font-semibold">Employees</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer class="bg-[#EEEEEE]  ">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
              <a href="https://flowbite.com/" class="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="https://flowbite.com/" class="hover:underline">
                      Flowbite
                    </a>
                  </li>
                  <li>
                    <a href="https://tailwindcss.com/" class="hover:underline">
                      Tailwind CSS
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      class="hover:underline "
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/4eeurUVvTy"
                      class="hover:underline"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="#" class="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" class="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
            <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span class="sr-only">Discord community</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">GitHub account</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
