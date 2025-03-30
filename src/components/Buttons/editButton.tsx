"use client";
import React, { useState } from "react";
import DeleteButton from "./deleteButton";

import { FormDataProps } from "../FormInput/form";
interface EditButtonProps {
  employee: FormDataProps;
  onUpdate: (updatedEmployee: FormDataProps) => void;
  onDelete: (employeeId: string) => void;
}

const EditButton: React.FC<EditButtonProps> = ({
  employee,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableEmployee, setEditableEmployee] = useState(employee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/patch/employee?employeeId=${employee.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editableEmployee),
        }
      );

      if (response.ok) {
        const updatedEmployee = await response.json();
        onUpdate(updatedEmployee);
        setIsEditing(false);
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-6 ">
        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          className={`w-16 bg-blue-950 hover:bg-white text-white hover:text-blue-950 font-bold py-2 rounded-lg shadow-md transition-all duration-300 text-center`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <DeleteButton employeeId={employee.id} onDelete={onDelete} />
      </div>

      {isEditing ? (
        <div className="mt-6 min-h-[150px]">
          <div className="flex flex-row justify-center items-center space-x-2 mb-1 ">
            <h5 className="text-blue-950 font-semibold whitespace-nowrap">
              First Name:
            </h5>
            {isEditing && (
              <input
                type="text"
                name="firstName"
                value={editableEmployee.firstName}
                onChange={handleChange}
                className="text-black border border-gray-300 rounded-s flex-grow h-full text-base pl-1"
              />
            )}
          </div>

          <div className="flex flex-row justify-center items-center space-x-2 mb-1">
            <h5 className="text-blue-950 block font-semibold whitespace-nowrap">
              Last Name:
            </h5>
            {isEditing && (
              <input
                type="text"
                name="lastName"
                value={editableEmployee.lastName}
                onChange={handleChange}
                className="text-black border border-gray-300 rounded-s flex-grow h-full text-base pl-1"
              />
            )}
          </div>

          <div className="flex flex-row justify-center items-center space-x-2 mb-1">
            <h5 className="text-blue-950 block font-semibold whitespace-nowrap">
              Role:
            </h5>
            {isEditing && (
              <input
                type="text"
                name="role"
                value={editableEmployee.role}
                onChange={handleChange}
                className="text-black border border-gray-300 rounded-s flex-grow h-full text-base pl-1"
              />
            )}
          </div>

          <div className="flex flex-row justify-center items-center space-x-2 mb-1">
            <h5 className="text-blue-950 block font-semibold whitespace-nowrap">
              Expected Salary:
            </h5>
            {isEditing && (
              <input
                type="number"
                name="expectedSalary"
                value={editableEmployee.expectedSalary}
                onChange={handleChange}
                className="text-black border border-gray-300 rounded-s flex-grow h-full text-base pl-1"
              />
            )}
          </div>

          <div className="flex flex-row justify-center items-center space-x-2 mb-1">
            <h5 className="text-blue-950 block font-semibold whitespace-nowrap">
              Expected Date of Defense:
            </h5>
            {isEditing && (
              <input
                type="text"
                name="expectedDateOfDefense"
                value={editableEmployee.expectedDateOfDefense}
                onChange={handleChange}
                className="text-black border border-gray-300 rounded-s flex-grow h-full text-base "
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <h5 className="text-blue-950 font-semibold mb-1">
            First Name: {employee.firstName}
          </h5>
          <h5 className="text-blue-950 font-semibold mb-1">
            Last Name: {employee.lastName}
          </h5>
          <h5 className="text-blue-950 font-semibold mb-1">
            Role: {employee.role}
          </h5>
          <h5 className="text-blue-950 font-semibold mb-1">
            Expected Salary: {employee.expectedSalary}
          </h5>
          <h5 className="text-blue-950 font-semibold mb-1">
            Expected Date of Defense: {employee.expectedDateOfDefense}
          </h5>
        </div>
      )}
    </div>
  );
};

export default EditButton;
