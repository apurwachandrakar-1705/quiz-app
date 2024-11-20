import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    const updatedErrors = { ...errors };
    if (name === "username" && value) {
      delete updatedErrors.username;
    } else if (name === "email" && value) {
      delete updatedErrors.email;
    } else if (name === "password" && value) {
      delete updatedErrors.password;
    } else if (name === "confirmPassword" && value === input.password) {
      delete updatedErrors.confirmPassword;
    }
    setErrors(updatedErrors);
  };
  const validate = () => {
    const errors = {};
    if (!input.username) {
      errors.username = "Username is required";
    } else {
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!input.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(input.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!input.password) {
      errors.password = "Password is required";
    }

    if (input.password !== input.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErros = validate();
    if (Object.keys(validationErros).length === 0) {
      try {
        const { confirmPassword, ...dataToSend } = input;
        const response = await fetch(
          "http://localhost:3000/api/quizApp/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const user = input.username;
          navigate("/startgame", { state: { user} });
        } else {
          const errorData = await response.json();
          console.error("Registration error", errorData.message);
          setErrors({ submit: errorData.message });
        }
      } catch (error) {
        console.error("Error:", error);
        setErrors({ submit: "Something went wrong. Please try again." });
      }
    } else {
      setErrors(validationErros);
    }
  };

  return (
    <div className="register-container">
      <div className="form-register">
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="username">UserName</label>
          <input
            onChange={handleChange}
            id="username"
            type="text"
            placeholder="Enter User Name"
            name="username"
          />
          {errors?.username && (
            <span className="error_line">{errors.username}</span>
          )}
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Enter Email"
            name="email"
          />
          {errors?.email && <span className="error_line">{errors.email}</span>}

          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Enter Password"
            name="password"
          />
          {errors?.password && (
            <span className="error_line">{errors.password}</span>
          )}

          <label htmlFor="cpassword">Confirm Password</label>
          <input
            onChange={handleChange}
            id="cpassword"
            type="password"
            placeholder="Re-Enter Password"
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <span className="error_line">{errors.confirmPassword}</span>
          )}
          <button
            className="btn btn-outline-success register_button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
