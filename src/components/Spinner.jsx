import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full my-10">
      <p className="border-2 border-indigo-500 border-r-transparent my-5 animate-spin w-[50px] border-b-0 h-[50px] rounded-full"></p>
    </div>
  );
};

export default Spinner;
