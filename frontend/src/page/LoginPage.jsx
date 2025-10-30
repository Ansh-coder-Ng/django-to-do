import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router'
import styles from "../css/LoginPage.module.css";

const LoginPage = () => {
  let navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  




  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const submitData = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/validate_user/",{
        "email":email,
        "password":password
      })

      localStorage.setItem("username", response.data.username)

      if(response.data.success)
      {
        localStorage.setItem("token",response.data.username) // Create Token on Success
        navigate('/main');
        
      }

    } catch (error) {
      console.error("Error fetching data:", error)
     }

  }



  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome Back 👋</h2>
        <form className={styles.loginForm}>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={handleEmail}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={handlePassword}
            className={styles.input}
          />
          <button className={styles.loginbtn} onClick={submitData}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
