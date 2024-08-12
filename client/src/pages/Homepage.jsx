import React, { useEffect, useState } from 'react'
import ClassRooms from '../components/ClassRooms'
import AddNewClassRoom from '../components/AddNewClassRoom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const [addStudent, setAddStudent] = useState(false)
  const [addTeacher, setAddTeacher] = useState(false)
  const [addClassRoom, setAddClassRoom] = useState(false)

  const user = useSelector((state)=>state.user.currentUser)


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const studentData = {
      username : e.target[0].value,
      email : e.target[1].value,
      password : e.target[2].value,
      status:"student",
      userId:user._id,
      classAt: e.target[3].value
    }
    const teacherData = {
      username : e.target[0].value,
      email : e.target[1].value,
      password : e.target[2].value,
      status: "teacher",
      userId:user._id,
    }
    console.log(studentData)
    try{
      const response = addTeacher ? await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/register`,teacherData) : await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/register`,studentData)
      if(response.status === 200){
        setAddTeacher(false)
        setAddStudent(false)
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='min-h-screen relative'>
      <div className="flex flex-col items-center justify-center">
      <span className='text-3xl'>{user?.isPrincipal && "Welcome Admin !"}</span>
      <b className='text-xl text-[grey] font-semibold'>CLASSROOMS !</b>
      </div>
      <div className='flex items-center gap-5 mt-5 justify-center'>
        {(!addStudent) &&<button className='py-2 px-4 bg-[teal] text-[white] rounded-md' onClick={()=>{setAddTeacher(true)
        }}>Add New Teacher</button>}

        {
          (!addTeacher) &&
          <button className='py-2 px-4 bg-[teal] text-[white] rounded-md'onClick={()=>setAddStudent(true)}>Add New Student</button>
        }

          <button className='py-2 px-4 bg-[teal] text-[white] rounded-md' onClick={()=>{setAddClassRoom(true)
          }}>Add New Classroom</button>

      </div>
      <ClassRooms />
      {
        (addStudent || addTeacher) && 
        <div className="flex items-center justify-center absolute inset-0 left-[50%] top-[50%] w-[40%] h-[50%] bg-[white]" style={{transform: "translate(-50%, -50%)"}}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[70%]'>
          <input type='text' placeholder='enter username' className='py-2 px-4 border border-[teal] outline-none rounded-md' />
          <input type='email' placeholder='enter email' className='py-2 px-4 border border-[teal] outline-none rounded-md' />
          <input type='password' placeholder='enter password' className='py-2 px-4 border border-[teal] outline-none rounded-md' />
          {
            !addTeacher &&
            <input type='text' placeholder='enter class' className='py-2 px-4 border border-[teal] outline-none rounded-md' />
          }

          <div className="flex items-center justify-between">
          <input type='submit' className='py-2 px-4 bg-[tomato] text-[white] cursor-pointer rounded-md outline-none' value={'Cancel'} onClick={()=>{setAddStudent(false)
            setAddTeacher(false)
          }}/>
          <input type='submit' className='py-2 px-4 bg-[teal] text-[white] cursor-pointer rounded-md outline-none' value={'Confirm'}/>
          </div>
        </form>
      </div>
      }
      {
        addClassRoom &&
        <>
                <AddNewClassRoom setAddClassRoom={setAddClassRoom} addClassRoom={addClassRoom}/>
        </>
      }
    </div>
  )
}

export default Homepage
