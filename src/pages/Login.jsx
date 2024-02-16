import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { serverUrl } from "../constants/server_url";
import { AuthContext } from "../context/authcontext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/user/login`,
        {
          email,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.messages);
     
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-[24rem] sm:max-w-md mx-2 sm:mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8 pb-4">
      <form
        onSubmit={submitHandler}
        className="w-[22rem] sm:max-w-sm mt-14 mb-4 mx-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email or Username
          </label>
          <input
            value={email ? email : username}
            onChange={(e) => {
              setEmail(e.target.value);
              setUsername(e.target.value);
            }}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" "
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          Submit
        </button>
      </form>
      <h4 className="px-4 w-full text-center">
        Don't have an account ?{" "}
        <Link
          className=" inline-block text-blue-700 font-medium underline"
          to={"/register"}
        >
          Signup{" "}
        </Link>
      </h4>
      {loading ? <Loader /> : ""}
    </div>
  );
};

export default Login;
