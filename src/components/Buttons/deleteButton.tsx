"use client";
import React, { useState } from "react";

interface DeleteButtonProps {
  employeeId: string;
  onDelete: (employeeId: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  employeeId,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const deleteEmployee = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/delete/employee?employeeId=${employeeId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        console.log("Failed to delete employee");
      }

      console.log("Employee Deleted");
      onDelete(employeeId);
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred while deleting the employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={deleteEmployee}
      disabled={loading}
      className={`bg-blue-950 hover:bg-white text-white hover:text-blue-950 font-bold py-2 px-2 rounded-lg shadow-md transition-all duration-300 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
