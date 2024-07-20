import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { endpoints } from "../defualts";
import { Link } from "react-router-dom";

const ScholarForm = () => {
  const [selectedPage, setSelectedPage] = useState("create");

  const renderContent = () => {
    switch (selectedPage) {
      case "create":
        return <Create />;
      default:
        return <Create />;
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
    
        <Link to={"/profile"} className="button4">
         Go Back
        </Link>
      </div>
    </header>
  );
};

const Sidebar = ({ onSelect }) => {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.nav}>
        <li style={styles.navItem} onClick={() => onSelect("create")}>
          Provide Scholarship
        </li>
      </ul>
    </aside>
  );
};

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    contactEmail: "",
    registration_number: "",
    year_established: "",
    provider_type: "organisation",
    phoneNumber: "",
    address: "",
    pin_code: "",
    city: "",
    country: "",
    image: null,
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        endpoints.CREATE_SCHOLARSHIP,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Scholarship submitted succesfully",
        showConfirmButton: false,
        timer: 4000,
      });
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
    <form style={styles.form} onSubmit={handleSubmit}>
        <h1 className="text-bold">Scholarship Provider Creation Form</h1>
      <div style={styles.formGroup}>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Website</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Registration Number</label>
        <input
          type="text"
          name="registration_number"
          value={formData.registration_number}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Year Established</label>
        <input
          type="number"
          name="year_established"
          value={formData.year_established}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Provider Type</label>
        <select
          name="provider_type"
          value={formData.provider_type}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="organisation">Organisation</option>
          <option value="club">Club</option>
          <option value="college">College</option>
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Pin Code</label>
        <input
          type="text"
          name="pin_code"
          value={formData.pin_code}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Image</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          style={styles.inputFile}
        />
      </div>
      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
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

export default ScholarForm;
