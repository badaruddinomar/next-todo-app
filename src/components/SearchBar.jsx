"use client";
import { addTodo } from "@/provider/todoReducer";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { todos } = useSelector((state) => state.todoReducer);

  const todoAddHandler = async (e) => {
    try {
      e.preventDefault();
      if (input === "") return;
      setIsLoading(true);
      const url = `https://jsonplaceholder.typicode.com/todos`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          title: input,
          id: Date.now(),
          completed: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        dispatch(
          addTodo({
            title: input,
            id: todos.length + 1, // !todo: bug - json placeholder does not save data. I stored the data manuallay into the todos array--
            completed: false,
          })
        );
        setInput("");
        setIsLoading(false);
        toast.success("Task Added successfully");
      }
    } catch (err) {
      setIsLoading(false);
      toast.success("Failed to fetch data");
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />

      <div className="w-full lg:w-[700px] mt-10">
        <form onSubmit={todoAddHandler}>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Write your task.."
              value={input}
              autoFocus="false"
              onChange={(e) => setInput(e.target.value)}
              className="w-full flex-1 font-primary lg:w-[700px] bg-[aliceblue] border-none outline-none h-[50px] px-3 rounded-l-md"
            />
            <button className="font-[16px] h-[50px] px-3 text-[16px] font-primary flex items-center   text-white rounded-r-md hover:opacity-50 transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <span
                className={`mr-2 ${
                  isLoading &&
                  "animate-spin h-5 w-5 mr-3 border-2 border-white rounded-full border-b-0 border-r-0"
                }`}
              >
                {isLoading ? "" : "Add Task"}
              </span>
              <FaPlus />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SearchBar;
