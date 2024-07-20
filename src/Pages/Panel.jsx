import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { endpoints } from "../defualts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Panel = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const renderContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return <ProfileTable />;
      // case 'create':
      //     return <Create />;
      case "settings":
        return <Scholarship />;
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
        <Link to={"/profile"} className="button4">
          Go Back
        </Link>
        {/* <span>{usernName}</span>     */}
      </div>
    </header>
  );
};

const Sidebar = ({ onSelect }) => {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.nav}>
        <li style={styles.navItem} onClick={() => onSelect("dashboard")}>
          Home
        </li>
        {/* <li style={styles.navItem} onClick={() => onSelect('create')}>Provide Scholarship</li> */}
        <li style={styles.navItem} onClick={() => onSelect("settings")}>
          Scholarship
        </li>
      </ul>
    </aside>
  );
};

const ProfileTable = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${endpoints.VIEW_SCHROLPRO_DETAILS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data.data, "3245678");
      const filteredProfile = {
        name: response.data.data.name,
        description: response.data.data.description,
        website: response.data.data.website,
        contact_email: response.data.data.contact_email,
        registration_number: response.data.data.registration_number,
        year_established: response.data.data.year_established,
        provider_type: response.data.data.provider_type,
        address: response.data.data.address,
        pin_code: response.data.data.pin_code,
        city: response.data.data.city,
        country: response.data.data.country,
      };
      setProfile(filteredProfile);
      localStorage.setItem("schrolId", response.data.data.id);
      localStorage.setItem("schrolType", response.data.data.provider_type);
      console.log(response.data.data, "3245678");
    } catch (error) {
      console.log(error.response ? error.response.data.detail : error.message);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" gutterBottom>
        Profile Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(profile).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key.replace("_", " ").toUpperCase()}</TableCell>
              <TableCell>{value || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Scholarship = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    start_date: "",
    end_date: "",
  });
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const token = localStorage.getItem("token");
  const uId = localStorage.getItem("schrolId");

  const fetchScholarships = async () => {
    try {
      const response = await axios.get(`${endpoints.LIST_SCHROL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("wer", response.data);
      if (response.data.data.length > 0) {
        setScholarships(response.data.data);
      } else {
        setScholarships([]);
      }
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${endpoints.CREATE_SCHROL}${uId}/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setScholarships([...scholarships, response.data]);
      setForm({
        title: "",
        description: "",
        amount: "",
        start_date: "",
        end_date: "",
      });
      fetchScholarships();
    } catch (error) {
      console.error("Error creating scholarship:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Scholarship
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Scholarship
            </Button>
          </Grid>
        </Grid>
      </form>
      <br /> <br />
      <hr></hr>
      <Typography
        variant="h5"
        gutterBottom
        style={{
          marginTop: "2rem",
          color: "Green",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Scholarships List
      </Typography>
      <hr></hr>
      {scholarships.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell>{scholarship.title}</TableCell>
                  <TableCell>{scholarship.description}</TableCell>
                  <TableCell>{scholarship.amount}</TableCell>
                  <TableCell>{scholarship.start_date}</TableCell>
                  <TableCell>{scholarship.end_date}</TableCell>
                  <TableCell>
                    {" "}
                    <Link to={`/panel2/${scholarship.id}`} className="button">
                      View <FaEye />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" style={{ marginTop: "2rem" }}>
          No scholarships found.
        </Typography>
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

export default Panel;
