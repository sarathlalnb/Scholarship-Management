import React, { useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { endpoints } from "../defualts";
import Swal from "sweetalert2";

const ScholarshipApply = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    scholarship: "",
    student: "",
    application_status: "pending",
    current_school: "",
    current_grade: "",
    major_field_of_study: "",
    awards_honors: "",
    relevant_courses_grades: "",
    research_projects: "",
    clubs_organizations: "",
    volunteer_work: "",
    leadership_roles: "",
    sports_competitions: "",
    family_income: "",
    number_of_dependents: "",
    financial_hardship_description: "",
    personal_essay: "",
    specific_questions: "",
    references_contact_info: "",
  });

  const [files, setFiles] = useState({
    additional_documents: null,
    letters_of_recommendation: null,
    transcripts: null,
    resume_cv: null,
    proof_of_enrollment: null,
    passport_photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles({ ...files, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append form data
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    // Append files
    for (const key in files) {
      if (files[key]) form.append(key, files[key]);
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${endpoints.APPLY_SCHROL}${id}/`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Form Submitted Succesfully",
        showConfirmButton: false,
        timer: 4000,
      });
      navigate('/')
    } catch (error) {
      console.error("Error submitting form", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 4000,
      });
    }
  };

  return (
    <div>
      <nav className="bg-gray-200 shadow shadow-gray-300 w-full px-8 md:px-auto">
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
              className="px-3 py-2 bg-[#e6ac00] hover:bg-[#ffd24d] text-gray-50 flex items-center gap-2 w-[50px] h-[50px] rounded-full"
            >
              <span>
                <FaUser style={{ fontSize: "28px" }} />
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8 bg-gray-700">
        <h1 className="text-2xl text-white text-center font-bold mb-6">
          Scholarship Application
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6  text-white p-6 rounded-md"
        >
          {/* Column 1 */}
          <div className="col-span-1">
            <input
              type="text"
              name="current_school"
              placeholder="Current School"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black "
            />
            <input
              type="text"
              name="current_grade"
              placeholder="Current Grade"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
            />
            <input
              type="text"
              name="major_field_of_study"
              placeholder="Major Field of Study"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
            />
            <textarea
              name="personal_essay"
              placeholder="Personal Essay"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />
            <textarea
              name="specific_questions"
              placeholder="Specific Questions"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />
            <textarea
              name="volunteer_work"
              placeholder="Volunteer Work"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />

            {/* <label htmlFor="">Additional Documents</label>
            <input
              type="file"
              name="additional_documents"
              onChange={handleFileChange}
              className="w-full mb-4"
            />
            <label htmlFor="">Letter of Recomendation</label>
            <input
              type="file"
              name="letters_of_recommendation"
              onChange={handleFileChange}
              className="w-full mb-4"
            /> */}
          </div>

          {/* Column 2 */}
          <div className="col-span-1">
            <textarea
              name="awards_honors"
              placeholder="Awards and Honors"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />
            <textarea
              name="relevant_courses_grades"
              placeholder="Relevant Courses and Grades"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />
            <textarea
              name="research_projects"
              placeholder="Research Projects"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />
            <textarea
              name="clubs_organizations"
              placeholder="Clubs and Organizations"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />

            <textarea
              name="leadership_roles"
              placeholder="Leadership Roles"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />
          </div>

          {/* Column 3 */}
          <div className="col-span-1">
            <textarea
              name="sports_competitions"
              placeholder="Sports Competitions"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />
            <input
              type="number"
              name="family_income"
              placeholder="Family Income"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
            />
            <input
              type="number"
              name="number_of_dependents"
              placeholder="Number of Dependents"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
            />
            <textarea
              name="financial_hardship_description"
              placeholder="Financial Hardship Description"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />
            <textarea
              name="references_contact_info"
              placeholder="References Contact Information"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded text-black"
              rows="4"
            />

            {/* File inputs */}

            {/* <label htmlFor="">Transcripts</label>
            <input
              type="file"
              name="transcripts"
              onChange={handleFileChange}
              className="w-full mb-4"
            /> */}
            <label htmlFor="">Resume</label>
            <input
              type="file"
              name="resume_cv"
              onChange={handleFileChange}
              className="w-full mb-4"
            />
            {/* <label htmlFor="">Proof of enrollment</label>
            <input
              type="file"
              name="proof_of_enrollment"
              onChange={handleFileChange}
              className="w-full mb-4"
            /> */}
            <label htmlFor="">Passport Size Photo</label>
            <input
              type="file"
              name="passport_photo"
              onChange={handleFileChange}
              className="w-full mb-4"
            />
          </div>

          <button
            type="submit"
            className="col-span-3 px-4 py-2 bg-blue-500 text-white rounded mt-6"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipApply;
