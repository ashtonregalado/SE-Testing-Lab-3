"use client";
import React from "react";

const AddButton: React.FC = () => {
  return (
    <div>
      <button
        type="submit"
        className="bg-blue-950 hover:bg-white text-white hover:text-blue-950 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
      >
        Add
      </button>
    </div>
  );
};

export default AddButton;
