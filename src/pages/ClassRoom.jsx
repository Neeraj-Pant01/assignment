import React, { useState, useEffect } from 'react'
import Students from '../components/Students'
import TimeTable from '../components/TimeTable'
import StudentList from '../components/StudentList'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AddTimeTabel from '../components/AddTimeTabel';
import { useSelector } from 'react-redux';


const ClassRoom = () => {
    const [showStudents, setShowStudents] = useState(false)
    const user = useSelector((state)=>state.user.currentUser)

    const [classDetails, setClassDetails] = useState();
    const [timetableDetails, setTimetableDetails] = useState()
    const navigate = useNavigate();

    const handleDelete = async () =>{
        try{
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/classroom/remove/${classDetails._id}`,{
                headers:{'User-ID': user?._id}
            })
            response.status === 200 && navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    const {id} = useParams();

    useEffect(()=>{
        const getClassDetails = async () =>{
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/classroom/${id}`)
            setClassDetails(response.data)
        }
        getClassDetails();
    },[])
    console.log("class", classDetails)

    useEffect(()=>{
        const getTimeTable = async () =>{
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/timetable/${id}`)
            setTimetableDetails(response.data)
            console.log("timetable",response.data)
        }
        getTimeTable();
    },[])

    return (
        <div className='min-h-screen w-[100%]'>
            <div className='flex flex-col items-center justify-center mt-8'>
                <div className="flex w-[70%] items-center justify-between gap-3">
                    <div className='flex items-start gap-2'>
                        <b>CLASS : </b>
                        <span>{classDetails?.className}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <b>Teacher : </b>
                        <span>{classDetails?.teacherAssigned}</span>
                    </div>
                    {(user?.status !== "student" && user?.status !== "teacher" ) &&
                    <div className="flex">
                        <div className="flex cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                        <div className="flex cursor-pointer ml-4" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="tomato" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </div>
                    </div>
                    }
                </div>
                <table className='w-[70%] mt-3 border-2'>
                    <thead className='border-2 bg-[teal] text-[white]'>
                        <tr>
                        <th className='border-2 text-left py-2 px-2'>ACTIVE DAYS</th>
                        <th className='border-2 text-left py-2 px-2'>START TIME</th>
                        <th className='border-2 text-left py-2 px-2'>END TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classDetails?.schedule.length > 0 &&
                            classDetails?.schedule.map((d,i)=>{
                                return (
                                    <tr key={i} className='border-2'>
                                    <td className='border-2 py-2 px-2 '>{d?.day}</td>
                                    <td className='border-2 py-2 px-2'>{d?.startTime}</td>
                                    <td className='border-2 py-2 px-2'>{d?.endTime}</td>
                                </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex flex-col items-center w-[100%] justify-center mt-5 gap-5'>
                <button className='py-2 px-2 bg-[teal] text-[white] cursor-pointer rounded-md' onClick={()=>setShowStudents(!showStudents)}>{showStudents ? "Hide Students":"show students"}</button>
                {
                    showStudents &&
                    <StudentList setShowStudents={setShowStudents} classNo={classDetails.className} />
                }
            </div>
            <>
            {
                timetableDetails?.length > 0 ?
                timetableDetails.map((t,i)=>{
                    return (
                        <TimeTable key={i} t={t} />
                    )
                })
                :
                <div className='flex items-center justify-center flex-col mt-5'>
                    <div className='text-center text-black text-xl'>add timetable</div>
                    <div className="flex gap-5 items-center justify-center mt-5 flex-wrap w-[90%]">
                    {
                        classDetails?.schedule.map((s,i)=>{
                            return (
                                <AddTimeTabel id={id} s={s} />
                            )
                        })
                    }
                    </div>
                    </div>
}
{
    user?.status !== "student" &&
    <div className="flex items-center justify-center">
<button className='bg-[teal] text-[white] py-2 px-5 rounded-md self-center' onClick={()=>window.location.reload()}>save</button>
</div>
}
                    </>
        </div>
    )
}

export default ClassRoom
