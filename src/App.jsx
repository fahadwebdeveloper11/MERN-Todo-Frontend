import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthContext } from "./context/authcontext";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "./constants/server_url";
import axios from "axios";
import Loader from "./components/Loader";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser,loading,setLoading} =
    useContext(AuthContext);
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${serverUrl}/user/me`, { withCredentials: true })
      .then((res) => {
        const { data } = res.data;
        setIsAuthenticated(true);
        setLoading(false)
        return setUser(data);
      })
      .catch((error) => {
        toast.error("Register or Login first");
        setLoading(false)
      });
  }, []);

  return (
    <>
      <Toaster />
      {loading ? <Loader /> : ""}
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
