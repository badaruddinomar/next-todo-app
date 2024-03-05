"use client";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, getTodos, updateTodo } from "@/provider/todoReducer";
import { MdOutlineClose } from "react-icons/md";
import Spinner from "./Spinner";
import { Toaster, toast } from "sonner";

const Todos = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const { todos } = useSelector((state) => state.todoReducer);
  const [isLoading, setIsLoading] = useState(false);

  // get todos--
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setIsLoading(true);
        const url = `https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          dispatch(getTodos(data));
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchHandler();
  }, [dispatch]);

  // handlers--
  const handleCheckTodos = async (id, title, completed, userId) => {
    try {
      setIsLoading(true);
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      const options = {
        method: "PUT",
        body: JSON.stringify({ id, title, completed, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        dispatch(updateTodo(data));
        setIsLoading(false);
        if (data.completed) {
          toast.success("Task marked as completed");
        } else {
          toast.success("Task marked as uncompleted");
        }
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Somthing went wrong!");
    }
  };

  // modal open handler-
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // delete todo handler--
  const handleDeleteTodo = async (id) => {
    try {
      setIsLoading(true);
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteTodo(id));
        setIsLoading(false);
        toast.success("Task Deleted successfully");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Somthing went wrong!");
    }
  };

  // update todo handler--
  const handleUpdateTodo = async (id, title, completed, userId) => {
    try {
      if (title === "") return;
      setIsLoading(true);
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      const options = {
        method: "PUT",
        body: JSON.stringify({ id, title, completed, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        dispatch(updateTodo(data));
        setOpenModal(false);
        setIsLoading(false);
        setEditedTitle("");
        toast.success("Task Updated successfully");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Somthing went wrong!");
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full lg:w-[700px] my-5">
          <ul className="w-full lg:w-[700px]">
            {todos.map((todo) => (
              <li
                key={todo.id + Date.now()}
                className="w-full min-h-[50px] max-h[auto] shadow-md px-3  leading-[50px] rounded-md flex justify-between items-center relative my-10"
              >
                <div className="flex items-center pt-[40px] pb-3">
                  <span
                    className={`font-primary leading-[1.5] ${
                      todo?.completed
                        ? "line-through text-[gray]"
                        : "text-[black]"
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <div className="flex items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-130%] bg-white shadow-sm px-5 py-3 rounded-full ">
                  <FaCheck
                    className={`mr-2 transition-all text-[20px] duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-1 h-[30px] w-[30px] rounded-full cursor-pointer hover:opacity-30 ${
                      todo?.completed ? "text-[greenyellow]" : "text-black"
                    }`}
                    onClick={() =>
                      handleCheckTodos(
                        todo?.id,
                        todo?.title,
                        !todo?.completed,
                        todo?.userId
                      )
                    }
                  />

                  <MdOutlineEdit
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-1 transition-all w-[30px] h-[30px] p-1 rounded-full text-white duration-300 cursor-pointer hover:opacity-30 text-[20px]"
                    onClick={handleOpenModal}
                  />
                  <FaRegTrashAlt
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-1 transition-all w-[30px] h-[30px] p-1 rounded-full text-white duration-300 cursor-pointer hover:opacity-30 text-[20px]"
                    onClick={() => handleDeleteTodo(todo.id)}
                  />
                </div>
                {/* popup modal-- */}
                {openModal && (
                  <div className="fixed top-0 left-0 z-40 w-screen h-screen px-5 transition-all duration-300 ctm-bg-modal">
                    <form
                      className="z-50 flex items-center justify-center w-full h-full"
                      onSubmit={() =>
                        handleUpdateTodo(
                          todo?.id,
                          editedTitle,
                          todo?.completed,
                          todo?.userId
                        )
                      }
                    >
                      <div className="flex relative items-center justify-center bg-white h-[200px] w-full sm:w-[400px] rounded-lg shadow-sm px-3">
                        <input
                          type="text"
                          placeholder="Edit your task..."
                          autoFocus="false"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="px-3 h-[50px] outline-none w-full flex-1  rounded-l-md bg-[aliceblue]"
                        />
                        <button className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer  text-[white] px-5 h-[50px] bg-[purple] rounded-r-md hover:opacity-50 transition-all duration-300">
                          Edit
                        </button>
                        <MdOutlineClose
                          onClick={() => setOpenModal(false)}
                          className="absolute top-[-10px] bg-gray-50 rounded shadow-md right-[-10px] text-black text-[25px] cursor-pointer hover:opacity-50 transition-all duration-300"
                        />
                      </div>
                    </form>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Todos;
