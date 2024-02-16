import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { serverUrl } from "../../constants/server_url";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/authcontext";

const SingleTodo = ({ title, content, id, isCompleted, isEditing }) => {
  const { refresh, setRefresh } = useContext(AuthContext);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setnewContent] = useState(content);

  const deleteTodo = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const res = await axios.delete(`${serverUrl}/todo/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setRefresh(!refresh);
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };
  const completeTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${serverUrl}/todo/${id}`,
        { isCompleted: true },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const editTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${serverUrl}/todo/edit/${id}`,
        { isEditing: true },
        {
          withCredentials: true,
        }
      );
      // toast.success(res.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const saveTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${serverUrl}/todo/update/${id}`,
        { newTitle, newContent },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <li className="py-4 gap-3 flex w-full justify-between items-center pr-8">
      <div className="flex w-full">
        <input
          name="title"
          type="checkbox"
          checked={isCompleted && !isEditing}
          onChange={completeTodo}
          className="h-4 mt-2 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mr-2"
        />
        <label htmlFor="title" className="ml-3 gap-1 text-gray-900 flex flex-col">
          <input
            type="text"
            name="newTitle"
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={!isEditing}
            value={newTitle}
            className="text-lg font-medium rounded-sm"
            autoFocus={isEditing}
            style={{
              outline: isEditing ? "1px solid rgb(5, 8, 22)" : "none",
              textDecoration:
                isCompleted && !isEditing ? "line-through" : "none",
            }}
          />

          <input
            type="text"
            name="newContent"
            className="text-sm font-light text-gray-500 mr-2 rounded-sm"
            disabled={!isEditing}
            onChange={(e) => setnewContent(e.target.value)}
            value={newContent}
            autoFocus={isEditing}
            style={{
              outline: isEditing ? "1px solid rgb(5, 8, 22)" : "none",
              textDecoration:
                isCompleted && !isEditing ? "line-through" : "none",
            }}
          />
        </label>
      </div>
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row w-full">
        {isEditing ? (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3"
            onClick={saveTodo}
          >
            Save
          </button>
        ) : (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3"
            onClick={editTodo}
          >
            Edit
          </button>
        )}
        <button
          className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={deleteTodo}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default SingleTodo;
