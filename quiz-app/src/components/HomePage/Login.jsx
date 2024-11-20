import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
 const navigate= useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/quizApp/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      if (response.ok) {
        const data = await response.json();
       const user = data.msg;
      
        navigate('/startgame',{state:{user}})

      } else {
        const errorData = await response.json();
        console.error("Registration error", errorData.message);
        setErrors({ submit: errorData.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    }
  };
  return (
    <div className="login-container">
      <div className="form-login">
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Enter Email"
            name="email"
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Enter Password"
            name="password"
          />
{errors?.submit && <span>Email or Password is incorrect... </span>}
          <button
            className="btn btn-outline-success login_button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
