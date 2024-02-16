import React, { useContext, useEffect, useState } from "react";
import SingleTodo from "./SingleTodo";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../../constants/server_url";
import { data } from "autoprefixer";
import { AuthContext } from "../../context/authcontext";
import Loader from "../Loader";

const Todos = () => {
  const [title, setTitle] = useState("");
  const [content, setCotent] = useState("");
  const [todos, setTodos] = useState([]);
  const { refresh, setRefresh, loading, setLoading } = useContext(AuthContext);

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${serverUrl}/todo/add`,
        {
          title,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setRefresh(!refresh);
      setTitle("");
      setCotent("");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // setLoading(true);
    axios
      .get(`${serverUrl}/todo/mytodos`, { withCredentials: true })
      .then((res) => {
        const { data } = res.data;
        // console.log(data);
        // setLoading(true);
        return setTodos(data);
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  }, [refresh]);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-[24rem] sm:w-[30rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8 pb-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          Mern-Stack To-Do App
        </h1>
      </div>
      <form onSubmit={addTodo} className="w-full max-w-lg mx-auto px-4 py-2">
        <div className="flex flex-col gap-5 border-b-2 border-blue-600 py-2">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" "
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              value={content}
              onChange={(e) => setCotent(e.target.value)}
              type="text"
              name="content"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" "
              required
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-w-fit sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 whitespace-nowrap dark:focus:ring-blue-800"
            type="submit"
          >
            Add Task
          </button>
        </div>
      </form>
      <ul className="divide- w-full divide-gray-200 px-4">
        {todos.map((todo) => (
          <SingleTodo
            key={todo._id}
            id={todo._id}
            title={todo.title}
            content={todo.content}
            isCompleted={todo.isCompleted}
            isEditing={todo.isEditing}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
