import React, { useEffect, useState } from 'react'
import Classroom from './Classroom'
import axios from 'axios'

const ClassRooms = () => {
  const [classRooms, setClassRooms] = useState([])

    useEffect(()=>{
        const getClassRooms = async () =>{
          try{
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/classroom/`)
            setClassRooms(response.data)
          }catch(err){
            console.log(err)
          }
        }
        getClassRooms()
      },[])
    return (
        <div className='flex flex-col items-center justify-center gap-[20px]'>
            {
                classRooms.length > 0 &&
                classRooms.map((c,i)=><Classroom key={i} c={c} />)
            }
        </div>
    )
}

export default ClassRooms
