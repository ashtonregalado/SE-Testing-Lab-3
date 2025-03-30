//activity-3\src\components\FormInput\form.tsx
"use client";
import React, { useState } from "react";
import HomeScreen from "../HomeScreen/home";
import AddButton from "../Buttons/addButton";

export interface FormDataProps {
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: number;
  expectedDateOfDefense: string;
  id: string;
}

const InputForm: React.FC = () => {
  const [form, setForm] = useState<FormDataProps>({
    firstName: "",
    lastName: "",
    groupName: "",
    role: "",
    expectedSalary: 0,
    expectedDateOfDefense: "",
    id: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });

  const [showHome, setShowHome] = useState(false);

  const formSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.groupName ||
      !form.role ||
      !form.expectedSalary ||
      !form.expectedDateOfDefense
    ) {
      setNotification({ message: "All fields are required!", type: "error" });

      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return;
    }

    const updatedForm = {
      ...form,
      id: `${form.firstName}-${form.lastName}-${form.role}`,
    };

    setForm(updatedForm);

    try {
      const response = await fetch("http://localhost:4000/post/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedForm),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      setNotification({
        message: "Form submitted successfully!",
        type: "success",
      });

      setForm({
        firstName: "",
        lastName: "",
        groupName: "",
        role: "",
        expectedSalary: 0,
        expectedDateOfDefense: "",
        id: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification({
        message: "Failed to submit form. Please try again.",
        type: "error",
      });
    }

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="bg-rose-100 flex flex-col justify-center items-center h-screen w-screen">
      {showHome ? (
        <HomeScreen></HomeScreen>
      ) : (
        <>
          <div className="bg-white flex flex-col justify-center items-center rounded-lg shadow-lg p-6 w-full max-w-lg">
            {notification.message && (
              <div
                className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 text-white rounded-md shadow-lg ${
                  notification.type === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
                style={{ zIndex: 1000 }}
              >
                {notification.message}
              </div>
            )}

            <div className="w-full">
              <button
                onClick={() => setShowHome(true)}
                className="w-11 h-11 bg-blue-950 hover:bg-white text-white hover:text-blue-950  text-xs rounded-full flex items-center justify-center shadow-md transition-all duration-300"
              >
                Home
              </button>
            </div>

            <h3 className="text-blue-950 text-2xl font-sans font-semibold mb-5">
              FILL UP FORM
            </h3>

            <form onSubmit={formSubmit}>
              <div>
                <p className="text-blue-950 text-base font-sans font-medium mb-1">
                  First Name
                </p>
                <input
                  className="bg-white border-1 border-gray-300 text-black text-sm mb-5 pl-3 w-80 h-8 rounded-sm"
                  type="text"
                  value={form.firstName}
                  placeholder="Enter your first name"
                  onChange={(e) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      firstName: e.target.value,
                    }))
                  }
                ></input>
              </div>

              <div>
                <p className="text-blue-950 text-base font-sans font-medium mb-1">
                  Last Name
                </p>
                <input
                  className="bg-white border-1 border-gray-300 text-black text-sm mb-5 pl-3 w-80 h-8 rounded-sm"
                  type="text"
                  value={form.lastName}
                  placeholder="Enter your last name"
                  onChange={(e) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      lastName: e.target.value,
                    }))
                  }
                ></input>
              </div>

              <div>
                <p className="text-blue-950 text-base font-sans font-medium mb-1">
                  Group Name
                </p>
                <input
                  className="bg-white border-1 border-gray-300 text-black text-sm mb-5 pl-3 w-80 h-8 rounded-sm"
                  type="text"
                  value={form.groupName}
                  placeholder="Enter your group name"
                  onChange={(e) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      groupName: e.target.value,
                    }))
                  }
                ></input>
              </div>

              <div>
                <p className="text-blue-950 text-base font-sans font-medium mb-1">
                  Role
                </p>
                <input
                  className="bg-white border-1 border-gray-300 text-black text-sm mb-5 pl-3 w-80 h-8 rounded-sm"
                  type="text"
                  value={form.role}
                  placeholder="Enter your role"
                  onChange={(e) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      role: e.target.value,
                    }))
                  }
                ></input>
              </div>

              <div>
                <p className="text-blue-950 text-base font-sans font-medium mb-1">
                  Expected Salary
                </p>
                <input
                  className="bg-white border-1 border-gray-300 text-black text-sm mb-5 pl-3 w-80 h-8 rounded-sm"
                  type="number"
                  value={form.expectedSalary == 0 ? "" : form.expectedSalary}
                  placeholder="Enter your expected salary"
                  onChange={(e) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      expectedSalary:
                        e.target.value === "" ? 0 : Number(e.target.value),
                    }))
                  }
                ></input>
              </div>

              <div>
                <p className="text-blue-950 text-base font-sans font-medium mb-1">
                  Expected Date of Defense
                </p>
                <input
                  className="bg-white border-1 border-gray-300 text-black text-sm mb-5 pl-3 w-80 h-8 rounded-sm"
                  type="text"
                  value={form.expectedDateOfDefense}
                  placeholder="Enter your expected date of defense"
                  onChange={(e) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      expectedDateOfDefense: e.target.value,
                    }))
                  }
                ></input>
              </div>

              <div className="flex justify-center">
                <AddButton />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default InputForm;
