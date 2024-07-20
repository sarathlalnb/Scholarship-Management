import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { endpoints } from "../defualts";
import { Link, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import styled from "styled-components";
import Modal from "react-modal";
const Panell = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const renderContent = () => {
    localStorage.setItem("selected", selectedPage);
    switch (selectedPage) {
      case "dashboard":
        return <ProfileTable />;
      // case 'create':
      //     return <Create />;
      case "settings":
        return <Scholarship />;
      case "settings1":
        return <Scholarship2 />;
      case "settings2":
        return <Scholarship3 />;
      default:
        return <ProfileTable />;
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <Sidebar onSelect={setSelectedPage} />
      <main style={styles.main}>{renderContent()}</main>
    </div>
  );
};

const Header = () => {
  const usernName = localStorage.getItem("userData");
  return (
    <header style={styles.header}>
      <div style={styles.profile}>
        <Link to={"/panel"} className="button4">
          Go Back
        </Link>
        {/* <span>{usernName}</span> */}
      </div>
    </header>
  );
};

const Sidebar = ({ onSelect }) => {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.nav}>
        <li style={styles.navItem} onClick={() => onSelect("dashboard")}>
          View Details
        </li>
        {/* <li style={styles.navItem} onClick={() => onSelect('create')}>Provide Scholarship</li> */}
        <li style={styles.navItem} onClick={() => onSelect("settings")}>
          Pending Apllications
        </li>
        <li style={styles.navItem} onClick={() => onSelect("settings1")}>
          Approved Apllications
        </li>
        <li style={styles.navItem} onClick={() => onSelect("settings2")}>
          Rejected Apllications
        </li>
      </ul>
    </aside>
  );
};

const ProfileTable = () => {
  const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  `;

  const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  `;

  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
  `;

  const TableHead = styled.th`
    text-align: left;
    padding: 12px;
    background-color: #f4f4f4;
    color: #333;
  `;

  const TableCell = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
  `;

  const TableRow = styled.tr`
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
  `;

  const [profile, setProfile] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${endpoints.VIEW_SPSCHROL}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfile(response.data.data);
    } catch (error) {
      console.log(error.response ? error.response.data.detail : error.message);
    }
  };

  return (
    <Container>
      <Title>Scholorship Details</Title>
      <Table>
        <tbody>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableCell>{profile.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableCell>{profile.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableCell>₹ {profile.amount}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Application Date</TableHead>
            <TableCell>
              {new Date(profile.application_date).toLocaleDateString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Start Date</TableHead>
            <TableCell>
              {new Date(profile.start_date).toLocaleDateString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>End Date</TableHead>
            <TableCell>
              {new Date(profile.end_date).toLocaleDateString()}
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </Container>
  );
};

const Scholarship = () => {
  const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  `;

  const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  `;

  const List = styled.ul`
    list-style-type: none;
    padding: 0;
  `;

  const ListItem = styled.li`
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Button = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;

  const ModalContent = styled.div`
    padding: 20px;
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    border-radius: 8px;
  `;

  Modal.setAppElement("#root");

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${endpoints.VIEW_APPLICANTS}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const selectedPage = localStorage.getItem("selected");

      console.log(selectedPage, "ertyuio");

      let filteredProfiles = [];
      filteredProfiles = response.data.data.filter(
        (profile) => profile.application_status === "pending"
      );

      setProfiles(filteredProfiles);
      localStorage.setItem("selected", "");
    } catch (error) {
      console.log(error.response ? error.response.data.detail : error.message);
    }
  };

  const handleViewClick = (profile) => {
    setSelectedProfile(profile);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  const handleStatusChange = async (event, profileId) => {
    const token = localStorage.getItem("token");
    const newStatus = event.target.value;

    try {
      const response = await axios.patch(
        `${endpoints.UPDATE_APPLICANT_STATUS}${profileId}/`,
        { application_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Scholarship Updated succesfully",
        showConfirmButton: false,
        timer: 4000,
      });
      console.log("Status updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response ? error.response.data.detail : error.message
      );
    }
  };

  return (
    <Container>
      <Title>Scholarship Applications</Title>
      <List>
        {profiles.map((profile, index) => (
          <ListItem key={index}>
            <div>
              <strong>Name:</strong> {profile.student.full_name}
              <br />
              <strong>Email:</strong> {profile.student.email}
              <br />
              <strong>Phone:</strong> {profile.student.phone}
              <br />
              <strong>Current School:</strong> {profile.current_school}
              <br />
              <strong>Major Field of Study:</strong>{" "}
              {profile.major_field_of_study}
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(event) => handleStatusChange(event, profile.id)}
            >
              <option selected>Change Application status</option>
              <option value="approved">Approve</option>
              <option value="rejected">Reject</option>
            </select>
            <Button onClick={() => handleViewClick(profile)}>View</Button>
          </ListItem>
        ))}
      </List>

      {selectedProfile && (
        <Modal
          isOpen={!!selectedProfile}
          onRequestClose={closeModal}
          contentLabel="Profile Details"
          style={{ content: { maxWidth: "600px", margin: "auto" } }}
        >
          <ModalContent>
            <h2>{selectedProfile.student.full_name}'s Details</h2>
            <p>
              <strong>Email:</strong> {selectedProfile.student.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedProfile.student.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(selectedProfile.student.dob).toLocaleDateString()}
            </p>
            <p>
              <strong>Address:</strong> {selectedProfile.student.address}
            </p>
            <p>
              <strong>Current School:</strong> {selectedProfile.current_school}
            </p>
            <p>
              <strong>Current Grade:</strong> {selectedProfile.current_grade}
            </p>
            <p>
              <strong>Major Field of Study:</strong>{" "}
              {selectedProfile.major_field_of_study}
            </p>
            <p>
              <strong>Awards & Honors:</strong> {selectedProfile.awards_honors}
            </p>
            <p>
              <strong>Relevant Courses & Grades:</strong>{" "}
              {selectedProfile.relevant_courses_grades}
            </p>
            <p>
              <strong>Research Projects:</strong>{" "}
              {selectedProfile.research_projects}
            </p>
            <p>
              <strong>Clubs & Organizations:</strong>{" "}
              {selectedProfile.clubs_organizations}
            </p>
            <p>
              <strong>Volunteer Work:</strong> {selectedProfile.volunteer_work}
            </p>
            <p>
              <strong>Leadership Roles:</strong>{" "}
              {selectedProfile.leadership_roles}
            </p>
            <p>
              <strong>Sports Competitions:</strong>{" "}
              {selectedProfile.sports_competitions}
            </p>
            <p>
              <strong>Family Income:</strong> ${selectedProfile.family_income}
            </p>
            <p>
              <strong>Number of Dependents:</strong>{" "}
              {selectedProfile.number_of_dependents}
            </p>
            <p>
              <strong>Financial Hardship Description:</strong>{" "}
              {selectedProfile.financial_hardship_description}
            </p>
            <p>
              <strong>Personal Essay:</strong> {selectedProfile.personal_essay}
            </p>
            <p>
              <strong>Specific Questions:</strong>{" "}
              {selectedProfile.specific_questions}
            </p>
            <p>
              <strong>References Contact Info:</strong>{" "}
              {selectedProfile.references_contact_info}
            </p>
            {/* <p>
              <strong>Transcript:</strong>{" "}
              {selectedProfile.transcripts ? (
                <a
                  href={selectedProfile.transcripts}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Transcript
                </a>
              ) : (
                "N/A"
              )}
            </p> */}
            <p>
              <strong>Resume/CV:</strong>{" "}
              {selectedProfile.resume_cv ? (
                <a
                  href={selectedProfile.resume_cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume/CV
                </a>
              ) : (
                "N/A"
              )}
            </p>
            {/* <p>
              <strong>Proof of Enrollment:</strong>{" "}
              {selectedProfile.proof_of_enrollment ? (
                <a
                  href={selectedProfile.proof_of_enrollment}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Proof of Enrollment
                </a>
              ) : (
                "N/A"
              )}
            </p> */}

            <p>
              <strong>Passport Photo:</strong>{" "}
              <img
                src={`http://10.10.50.89:8000/${selectedProfile.passport_photo}`}
                alt="Passport"
                width="100"
              />
            </p>
            <Button onClick={closeModal}>Close</Button>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};
const Scholarship2 = () => {
  const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  `;

  const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  `;

  const List = styled.ul`
    list-style-type: none;
    padding: 0;
  `;

  const ListItem = styled.li`
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Button = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;

  const ModalContent = styled.div`
    padding: 20px;
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    border-radius: 8px;
  `;

  Modal.setAppElement("#root");

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  //   const [schty, setSchty] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${endpoints.VIEW_APPLICANTS}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const selectedPage = localStorage.getItem("selected");

      console.log(selectedPage, "ertyuio");

      let filteredProfiles = [];
      filteredProfiles = response.data.data.filter(
        (profile) => profile.application_status === "approved"
      );

      setProfiles(filteredProfiles);
      localStorage.setItem("selected", "");
    } catch (error) {
      console.log(error.response ? error.response.data.detail : error.message);
    }
  };

  const handleViewClick = (profile) => {
    setSelectedProfile(profile);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  const closeModal2 = () => {};

  const handleStatusChange = async (event, profileId) => {
    const token = localStorage.getItem("token");
    const newStatus = event.target.value;

    try {
      const response = await axios.patch(
        `${endpoints.UPDATE_APPLICANT_STATUS}${profileId}/`,
        { application_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status === 200){

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Scholarship Updated succesfully",
            showConfirmButton: false,
            timer: 4000,
          });
      }
      console.log("Status updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response ? error.response.data.detail : error.message
      );
    }
  };

  const schType = localStorage.getItem("schrolType");
  const TestCheck = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [examInstructions, setExamInstructions] = useState("");

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleInstructionsChange = (e) => {
      setExamInstructions(e.target.value);
    };

    const token = localStorage.getItem("token");
    const formData = {
        content : examInstructions
    }
    const handleSaveInstructions = () => {
      try {
          const response =  axios.post(
            `${endpoints.DO_EXAM}${id}/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          console.log(response.data);
          if(response){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Exam Submited succesfully",
              showConfirmButton: false,
              timer: 4000,
            });
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 4000,
          });
        }
      console.log(examInstructions);
    };

    

    return (
      <>
        {schType === "college" && (
          <div>
            <button className="button mb-3" onClick={handleOpenModal}>
              Conduct Exam for all candidates
            </button>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Exam Instructions"
          style={{
            content: { maxWidth: "600px", maxHeight: "400px", margin: "auto" },
          }}
          overlayClassName="modal-overlay"
          ariaHideApp={false}
        >
          <ModalContent>
            <h2> <strong> Enter Exam Instructions</strong></h2>
            <textarea
              value={examInstructions}
              onChange={handleInstructionsChange}
              placeholder="Enter place and realated details here"
              rows="5"
              cols="30"
            />
            <Button className="ms-4" onClick={handleSaveInstructions}>Save</Button>
            
            <Button className="ms-2" onClick={handleCloseModal}>Close</Button>
          </ModalContent>
        </Modal>
      </>
    );
  };
const token = localStorage.getItem("token");
  const handleProvide = (student) => {
    try {
        const response =  axios.get(
          `${endpoints.PROVIDE_SCHROL}${id}/${student}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if(response.data){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Exam Submited succesfully",
            showConfirmButton: false,
            timer: 4000,
          });
        }
        else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 4000,
              });
        }
      } catch (error) {
        console.error("Error:", error);
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
    <Container>
      {TestCheck()}
      <Title>Scholarship Applications</Title>

      <List>
        {profiles.map((profile, index) => (
          <ListItem key={index}>
            <div>
              <strong>Name:</strong> {profile.student.full_name}
              <br />
              <strong>Email:</strong> {profile.student.email}
              <br />
              <strong>Phone:</strong> {profile.student.phone}
              <br />
              <strong>Current School:</strong> {profile.current_school}
              <br />
              <strong>Major Field of Study:</strong>{" "}
              {profile.major_field_of_study}
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(event) => handleStatusChange(event, profile.id)}
            >
              <option selected>Change Application status</option>
              <option value="rejected">Reject</option>
            </select>
            <Button onClick={() => handleViewClick(profile)}>View</Button>
            
            <Button onClick={() => handleProvide(profile.student.id)}>Provide Scholarship</Button>
          </ListItem>
        ))}
      </List>

      {selectedProfile && (
        <Modal
          isOpen={!!selectedProfile}
          onRequestClose={closeModal}
          contentLabel="Profile Details"
          style={{ content: { maxWidth: "600px", margin: "auto" } }}
        >
          <ModalContent>
            <h2>{selectedProfile.student.full_name}'s Details</h2>
            <p>
              <strong>Email:</strong> {selectedProfile.student.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedProfile.student.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(selectedProfile.student.dob).toLocaleDateString()}
            </p>
            <p>
              <strong>Address:</strong> {selectedProfile.student.address}
            </p>
            <p>
              <strong>Current School:</strong> {selectedProfile.current_school}
            </p>
            <p>
              <strong>Current Grade:</strong> {selectedProfile.current_grade}
            </p>
            <p>
              <strong>Major Field of Study:</strong>{" "}
              {selectedProfile.major_field_of_study}
            </p>
            <p>
              <strong>Awards & Honors:</strong> {selectedProfile.awards_honors}
            </p>
            <p>
              <strong>Relevant Courses & Grades:</strong>{" "}
              {selectedProfile.relevant_courses_grades}
            </p>
            <p>
              <strong>Research Projects:</strong>{" "}
              {selectedProfile.research_projects}
            </p>
            <p>
              <strong>Clubs & Organizations:</strong>{" "}
              {selectedProfile.clubs_organizations}
            </p>
            <p>
              <strong>Volunteer Work:</strong> {selectedProfile.volunteer_work}
            </p>
            <p>
              <strong>Leadership Roles:</strong>{" "}
              {selectedProfile.leadership_roles}
            </p>
            <p>
              <strong>Sports Competitions:</strong>{" "}
              {selectedProfile.sports_competitions}
            </p>
            <p>
              <strong>Family Income:</strong> ${selectedProfile.family_income}
            </p>
            <p>
              <strong>Number of Dependents:</strong>{" "}
              {selectedProfile.number_of_dependents}
            </p>
            <p>
              <strong>Financial Hardship Description:</strong>{" "}
              {selectedProfile.financial_hardship_description}
            </p>
            <p>
              <strong>Personal Essay:</strong> {selectedProfile.personal_essay}
            </p>
            <p>
              <strong>Specific Questions:</strong>{" "}
              {selectedProfile.specific_questions}
            </p>
            <p>
              <strong>References Contact Info:</strong>{" "}
              {selectedProfile.references_contact_info}
            </p>
            {/* <p>
                <strong>Transcript:</strong>{" "}
                {selectedProfile.transcripts ? (
                  <a
                    href={selectedProfile.transcripts}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Transcript
                  </a>
                ) : (
                  "N/A"
                )}
              </p> */}
            <p>
              <strong>Resume/CV:</strong>{" "}
              {selectedProfile.resume_cv ? (
                <a
                  href={selectedProfile.resume_cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume/CV
                </a>
              ) : (
                "N/A"
              )}
            </p>
            {/* <p>
                <strong>Proof of Enrollment:</strong>{" "}
                {selectedProfile.proof_of_enrollment ? (
                  <a
                    href={selectedProfile.proof_of_enrollment}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Proof of Enrollment
                  </a>
                ) : (
                  "N/A"
                )}
              </p> */}

            <p>
              <strong>Passport Photo:</strong>{" "}
              <img
                src={`http://10.10.50.89:8000/${selectedProfile.passport_photo}`}
                alt="Passport"
                width="100"
              />
            </p>
            <Button onClick={closeModal}>Close</Button>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};
const Scholarship3 = () => {
  const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  `;

  const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  `;

  const List = styled.ul`
    list-style-type: none;
    padding: 0;
  `;

  const ListItem = styled.li`
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Button = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;

  const ModalContent = styled.div`
    padding: 20px;
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    border-radius: 8px;
  `;

  Modal.setAppElement("#root");

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${endpoints.VIEW_APPLICANTS}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const selectedPage = localStorage.getItem("selected");

      console.log(selectedPage, "ertyuio");

      let filteredProfiles = [];
      filteredProfiles = response.data.data.filter(
        (profile) => profile.application_status === "rejected"
      );

      setProfiles(filteredProfiles);
      localStorage.setItem("selected", "");
    } catch (error) {
      console.log(error.response ? error.response.data.detail : error.message);
    }
  };

  const handleViewClick = (profile) => {
    setSelectedProfile(profile);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  const handleStatusChange = async (event, profileId) => {
    const token = localStorage.getItem("token");
    const newStatus = event.target.value;

    try {
      const response = await axios.patch(
        `${endpoints.UPDATE_APPLICANT_STATUS}${profileId}/`,
        { application_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Scholarship Updated succesfully",
        showConfirmButton: false,
        timer: 4000,
      });
      setSelectedPage(dashboard);
      console.log("Status updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response ? error.response.data.detail : error.message
      );
    }
  };

  return (
    <Container>
      <Title>Scholarship Applications</Title>
      <List>
        {profiles.map((profile, index) => (
          <ListItem key={index}>
            <div>
              <strong>Name:</strong> {profile.student.full_name}
              <br />
              <strong>Email:</strong> {profile.student.email}
              <br />
              <strong>Phone:</strong> {profile.student.phone}
              <br />
              <strong>Current School:</strong> {profile.current_school}
              <br />
              <strong>Major Field of Study:</strong>{" "}
              {profile.major_field_of_study}
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(event) => handleStatusChange(event, profile.id)}
            >
              <option selected>Change Application status</option>
              <option value="approved">Approve</option>
            </select>
            <Button onClick={() => handleViewClick(profile)}>View</Button>
          </ListItem>
        ))}
      </List>

      {selectedProfile && (
        <Modal
          isOpen={!!selectedProfile}
          onRequestClose={closeModal}
          contentLabel="Profile Details"
          style={{ content: { maxWidth: "600px", margin: "auto" } }}
        >
          <ModalContent>
            <h2>{selectedProfile.student.full_name}'s Details</h2>
            <p>
              <strong>Email:</strong> {selectedProfile.student.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedProfile.student.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(selectedProfile.student.dob).toLocaleDateString()}
            </p>
            <p>
              <strong>Address:</strong> {selectedProfile.student.address}
            </p>
            <p>
              <strong>Current School:</strong> {selectedProfile.current_school}
            </p>
            <p>
              <strong>Current Grade:</strong> {selectedProfile.current_grade}
            </p>
            <p>
              <strong>Major Field of Study:</strong>{" "}
              {selectedProfile.major_field_of_study}
            </p>
            <p>
              <strong>Awards & Honors:</strong> {selectedProfile.awards_honors}
            </p>
            <p>
              <strong>Relevant Courses & Grades:</strong>{" "}
              {selectedProfile.relevant_courses_grades}
            </p>
            <p>
              <strong>Research Projects:</strong>{" "}
              {selectedProfile.research_projects}
            </p>
            <p>
              <strong>Clubs & Organizations:</strong>{" "}
              {selectedProfile.clubs_organizations}
            </p>
            <p>
              <strong>Volunteer Work:</strong> {selectedProfile.volunteer_work}
            </p>
            <p>
              <strong>Leadership Roles:</strong>{" "}
              {selectedProfile.leadership_roles}
            </p>
            <p>
              <strong>Sports Competitions:</strong>{" "}
              {selectedProfile.sports_competitions}
            </p>
            <p>
              <strong>Family Income:</strong> ${selectedProfile.family_income}
            </p>
            <p>
              <strong>Number of Dependents:</strong>{" "}
              {selectedProfile.number_of_dependents}
            </p>
            <p>
              <strong>Financial Hardship Description:</strong>{" "}
              {selectedProfile.financial_hardship_description}
            </p>
            <p>
              <strong>Personal Essay:</strong> {selectedProfile.personal_essay}
            </p>
            <p>
              <strong>Specific Questions:</strong>{" "}
              {selectedProfile.specific_questions}
            </p>
            <p>
              <strong>References Contact Info:</strong>{" "}
              {selectedProfile.references_contact_info}
            </p>
            {/* <p>
                <strong>Transcript:</strong>{" "}
                {selectedProfile.transcripts ? (
                  <a
                    href={selectedProfile.transcripts}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Transcript
                  </a>
                ) : (
                  "N/A"
                )}
              </p> */}
            <p>
              <strong>Resume/CV:</strong>{" "}
              {selectedProfile.resume_cv ? (
                <a
                  href={selectedProfile.resume_cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume/CV
                </a>
              ) : (
                "N/A"
              )}
            </p>
            {/* <p>
                <strong>Proof of Enrollment:</strong>{" "}
                {selectedProfile.proof_of_enrollment ? (
                  <a
                    href={selectedProfile.proof_of_enrollment}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Proof of Enrollment
                  </a>
                ) : (
                  "N/A"
                )}
              </p> */}

            <p>
              <strong>Passport Photo:</strong>{" "}
              <img
                src={`http://10.10.50.89:8000/${selectedProfile.passport_photo}`}
                alt="Passport"
                width="100"
              />
            </p>
            <Button onClick={closeModal}>Close</Button>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  header: {
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  profile: {
    display: "flex",
    alignItems: "center",
  },
  profileImg: {
    borderRadius: "50%",
    marginRight: "10px",
  },
  sidebar: {
    width: "200px",
    background: "#444",
    color: "#fff",
    height: "100vh",
    padding: "20px",
    position: "fixed",
    top: "60px",
    left: 0,
  },
  nav: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    padding: "10px 0",
    cursor: "pointer",
  },
  main: {
    marginLeft: "200px",
    marginTop: "60px",
    padding: "20px",
    width: "calc(100% - 200px)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    background: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    minHeight: "100px",
  },
  select: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  inputFile: {
    padding: "5px",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Panell;
