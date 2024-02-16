import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";
import axios from "axios";
import { serverUrl } from "../../constants/server_url";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/user/logout`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // if (!isAuthenticated) return <Navigate to={"/"} />;

  return (
  <div className="bg-slate-700 w-full">
      <div className="w-full h-10 bg-slate-900 text-white flex items-center justify-center sm:justify-end gap-14 text-base font-normal uppercase sm:px-20 px-0 ">
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile">Profile</Link>
          <button
            disabled={loading}
            onClick={logoutHandler}
            className="uppercase"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {" "}
          <Link to="/login">Login</Link>
          <Link to="/register">Sign up</Link>
        </>
      )}
    </div>
  </div>
  );
};

export default Navbar;
