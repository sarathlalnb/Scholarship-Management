import React, { createContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAndLogOff = () => {
    const token = sessionStorage.getItem("token");
    if (!token) { 
      loggoff(() => {
        navigate(`/`);
        console.log("User logged off due to missing token.");
      });
    }
  };

  useEffect(() => {
    checkAndLogOff();
  }, []); 

  const setCurrentUser = (userData) => {
    const token = userData.token.access;
    sessionStorage.setItem("token", token);

    const userString = JSON.stringify(userData.user);
    sessionStorage.setItem("user", userString);

    setUser(userData.user);
  };

  const getCurrentUser = () => {
    const userString = sessionStorage.getItem("user");
    if (user) {
      return user;
    }
    if (userString) {
      return JSON.parse(userString);
    }
  };

  const loggoff = (callBack) => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    callBack();
  };

  const value = useMemo(() => ({
    user,
    setCurrentUser,
    getCurrentUser,
    loggoff,
  }));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;