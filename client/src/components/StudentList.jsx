import React, { useEffect, useState } from 'react'
import Student from './Student'
import axios from 'axios'

const StudentList = ({classNo,setShowStudents}) => {
  const [students, setStudents] = useState([])

  console.log("class No", classNo)
  useEffect(()=>{
    const getStudents = async () =>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/students/${classNo}`)
        setStudents(response.data)
      }catch(err){
        console.log(err)
      }
    }
    getStudents();
  },[])
  return (
    <div className='flex items-center justify-center flex-col gap-2 w-[100%]'>
      {
        students.map((s,i)=><Student key={i} s={s} setShowStudents={setShowStudents} />)
      }
    </div>
  )
}

export default StudentList
