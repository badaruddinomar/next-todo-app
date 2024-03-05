import SearchBar from "@/components/SearchBar";
import Todos from "@/components/Todos";
import React from "react";

const Home = () => {
  return (
    <div className="px-[20px] md:px-[40px] lg:px-[60px] flex w-full h-[auto] justify-center items-center flex-col">
      <h1 className="mt-10 text-[30px] lg:text[40px] font-secondary font-bold text-center text-gray-900 ">
        Todo List App
      </h1>
      <SearchBar />
      <Todos />
    </div>
  );
};

export default Home;
