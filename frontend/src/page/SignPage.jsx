import React, { useState } from "react"
import styles from "../css/SignPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

const SignPage=()=>{
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")

    var navigate=useNavigate()

    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    
    const handleUsername=(e)=>{
        setUsername(e.target.value)
    }

    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }


    const handleSubmit=async()=>{
        try {
        const response = await axios.post("http://localhost:8000/add_user/",{
            "email":email,
            "username":username,
            "password":password
        })

        if(response.data.success)
        {
            console.log("Navigation")
            navigate('/login');            
        }
        else{
            alert(response.data.message)
            setMessage(response.data.message)
        }

        } catch (error) {
        console.error("Error fetching data:", error)
        }
    }

    return(

        <div className={styles.container}>
        <div className={styles.formBox}>
        <h2 className={styles.heading}>Sign Up</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          className={styles.input}
        />

        {message && <p>{message}</p>}
        <button onClick={handleSubmit} className={styles.button}>
          Submit
        </button>
      </div>
    </div>

    )

}

export default SignPage