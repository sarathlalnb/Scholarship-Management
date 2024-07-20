import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { endpoints } from "../defualts";

const Provider = () => {
  const { id } = useParams();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getScholarships();
  }, [id]);

  const getScholarships = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${endpoints.LIST_SCHROLSS}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setScholarships(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error.response ? error.response.data.detail : error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              <li className="md:px-4 md:py-2 hover:text-[#e6ac00]">
                <a href="/">Home</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-[#e6ac00]">
                <a href="/listProviders">List Providers</a>
              </li>
            </ul>
          </div>
          <div className="order-2 md:order-3">
            <Link
              to={"/profile"}
              className="px-3 py-2 bg-[#e6ac00] hover:bg-[#ffd24d] text-gray-50  flex items-center gap-2 w-[50px] h-[50px] rounded-full"
            >
              <span>
                <FaUser style={{ fontSize: "28px" }} />
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Scholarships</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((scholarship) => (
            <Link 
              to={`/SschrolForm/${scholarship.id}`} 
              key={scholarship.id} 
              className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{scholarship.title}</h2>
                <p className="text-gray-700 mb-2">{scholarship.description}</p>
                <p className="text-gray-700 mb-2"><strong>Amount:</strong> {scholarship.amount}</p>
                <p className="text-gray-700 mb-2"><strong>Application Date:</strong> {scholarship.application_date}</p>
                <p className="text-gray-700 mb-2"><strong>Start Date:</strong> {scholarship.start_date}</p>
                <p className="text-gray-700 mb-2"><strong>End Date:</strong> {scholarship.end_date}</p>
                <button className="button2">Apply Now</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Provider;
