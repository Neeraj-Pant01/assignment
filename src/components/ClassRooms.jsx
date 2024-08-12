import React, { useEffect, useState } from 'react'
import Classroom from './Classroom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ClassRooms = () => {
  const [classRooms, setClassRooms] = useState([])
  const [filteredStudentClass, setFilteredStudentClass] = useState()
  const [filteredTeacherClass, setFilteredTeacherClass] = useState()
  const user = useSelector((state)=>state.user.currentUser)
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)

    useEffect(()=>{
      setLoading(true)
        const getClassRooms = async () =>{
          try{
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/classroom/`)
            setClassRooms(response.data)

            const currentStudentClass = response.data.filter((c)=>user?.classAt == c.className);
            setFilteredStudentClass(currentStudentClass)

            // response.data.filter((c)=>console.log(c.className === user.classAt));

            console.log(user.classAt)

            const currentTeacherClass = response.data.filter((c)=>user?.username == c.teacherAssigned);

            setFilteredTeacherClass(currentTeacherClass)
            setLoading(false)
          }catch(err){
            console.log(err)
            setErr(true);
            setLoading(false)
            setTimeout(()=>{
              setErr(false)
            },5000)
          }
        }
        getClassRooms()
      },[])
    return (
      <>
      {loading && <div className='flex items-center text-[grey] top-10 text-xl'>Loading...</div>}
      {
        user?.isPrincipal &&
        <div className='flex flex-col items-center justify-center gap-[20px]'>
        {
            classRooms?.length > 0 &&
            classRooms.map((c,i)=><Classroom key={i} c={c} />)
        }
    </div>
      }
            {
        user?.status === "student" &&
        <div className='flex flex-col items-center justify-center gap-[20px]'>
        {
            filteredStudentClass?.length > 0 &&
            filteredStudentClass.map((c,i)=><Classroom key={i} c={c} />)
        }
    </div>
      }
      {
        user?.status === "teacher" &&
        <div className='flex flex-col items-center justify-center gap-[20px]'>
        {
            filteredTeacherClass?.length > 0 &&
            filteredTeacherClass.map((c,i)=><Classroom key={i} c={c} />)
        }
    </div>
      }
      {
        err &&
        <div className='text-center text-[tomato]'>
          error occured try refreshing the page !
        </div>
      }
      </>
    )
}

export default ClassRooms
