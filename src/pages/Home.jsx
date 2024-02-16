import React, { useContext, useEffect } from "react";
import Todos from "../components/Todos/Todos";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Login from "./Login";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Login or Register first");
    }
  }, []);

  return <div>{isAuthenticated ? <Todos /> : <Login />}</div>;
};

export default Home;
