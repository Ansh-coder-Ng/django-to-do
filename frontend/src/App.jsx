import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import {useNavigate} from 'react-router'

function App() {

  const [newTask,setNewTask]=useState("");
  const [currTasks,setCurrTasks]=useState([]);
  const [username,setUsername]=useState("")
  
  let navigate=useNavigate()

  function handleChange(event)
  {
      setNewTask(event.target.value)
  }

  const addTask=async()=>{
      setCurrTasks((prev)=>[...prev,newTask])
      setNewTask("")
  }

  const updateTask=(index,value)=>{
      const updatedTasks = [...currTasks];
      updatedTasks[index] = value; 
      setCurrTasks(updatedTasks)
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const deleteToken=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("username")
    navigate("/")
  }
  
  function removeTask(index)
  {
      setCurrTasks((prev)=>prev.filter((element,i)=>i!=index ) )
    
  }

  useEffect(()=>{
    const getFirst=async()=>{

        try{
          const username_local = localStorage.getItem('username');
          setUsername(username_local)
          const response=await fetch(`http://localhost:8000/get_data/?username=${username_local}`)
          const data=await response.json(); 
          setCurrTasks(data) 
          console.log(data)
        }
         catch(error)
        { 
        console.log(error)
        }
    }
    getFirst()
  
  
  },[]);

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(currTasks));

  
    const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/post_data/",{
        "name":username,
        "tasks":currTasks
      })
      console.log("This is post_data response ",response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
     }
    }
     fetchData()
    
  console.log(currTasks)
   
  },[currTasks])


  return (
    <>
      <div className='main'>
          <div className='container'>
            <h2>Work Analyzer</h2>

            <div className='header'>
                <input type='text' value={newTask} onChange={handleChange} />
                <button onClick={addTask}>Add</button>
            </div>

            <div className='tasks'>
                <ol>
                  {currTasks.map((task,index)=>{
                        return (
                        <li className='list-item' key={index}>
                          <span onBlur={(e)=>{updateTask(index,e.target.innerText) } } >
                            {task} 
                          </span>
            
                          <button onClick={() => removeTask(index)}>Remove</button>          
                        </li>
                        )
                  }
                  )}
                </ol>
            </div>


            <button onClick={deleteToken}>Log Out</button>
      </div>
      </div>
    </>
  )
}

export default App
