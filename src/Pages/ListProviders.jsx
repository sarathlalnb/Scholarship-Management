import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../defualts";


const ListProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${endpoints.LIST_ALLSCHROLPRO}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProviders(response.data.data);
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
        <h1 className="text-2xl font-bold mb-4">Scholarship Providers</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <Link to={`/provider/${provider.id}`} key={provider.id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={`http://10.10.50.89:8000/${provider.image}`}
                  alt={provider.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{provider.name}</h2>
                  <p className="text-gray-700 mb-4">{provider.description}</p>
                  <p className="text-gray-700">
                    <strong>Website:</strong>{" "}
                    <a href={provider.website} className="text-blue-500">
                      {provider.website}
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {provider.contactEmail}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {provider.phoneNumber}
                  </p>
                  <p className="text-gray-700">
                    <strong>Address:</strong> {provider.address}
                  </p>
                  <p className="text-gray-700">
                    <strong>City:</strong> {provider.city}
                  </p>
                  <p className="text-gray-700">
                    <strong>Country:</strong> {provider.country}
                  </p>
                  <p className="text-gray-700">
                    <strong>Pin Code:</strong> {provider.pin_code}
                  </p>
                  <p className="text-gray-700">
                    <strong>Provider Type:</strong> {provider.provider_type}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProviders;
