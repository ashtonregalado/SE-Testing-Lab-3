//activity-3\src\components\HomeScreen\home.tsx
"use client";
import React, { useState, useEffect } from "react";
import InputForm from "../FormInput/form";
import { FormDataProps } from "../FormInput/form";
import EditButton from "../Buttons/editButton";

const HomeScreen: React.FC = () => {
  const [employees, setEmployees] = useState<FormDataProps[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employee = await fetch("http://localhost:4000/get/all");
        const data = await employee.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching Employee:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleUpdate = (updatedEmployee: FormDataProps) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const handleDelete = (employeeId: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== employeeId)
    );
  };

  return (
    <div className="bg-rose-100 flex justify-center items-center h-screen w-screen">
      <div className="flex justify-center items-center flex-col h-screen w-screen pt-5">
        {showForm ? (
          <InputForm></InputForm>
        ) : (
          <>
            <p className="text-white font-bold text-4xl">EMPLOYEE LIST</p>
            <div className="w-screen flex justify-end">
              <button
                className="bg-white hover:bg-blue-950 text-blue-950 hover:text-white rounded-lg font-bold px-4 py-4 mx-8"
                onClick={() => setShowForm(true)}
              >
                + add employee
              </button>
            </div>

            <ul className="grid grid-cols-3 gap-5 h-screen w-screen overflow-y-auto p-8">
              {employees.map((employee) => (
                <li
                  key={employee.id}
                  className="bg-white shadow-md p-4 rounded-md w-110 h-60"
                >
                  <div className="w-full flex justify-between items-center mb-8">
                    <EditButton
                      employee={employee}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    ></EditButton>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
