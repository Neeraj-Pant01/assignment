import React from 'react'
import { Link } from 'react-router-dom'

const Classroom = ({c}) => {
    return (
        <div className='flex w-[70%] bg-[#eaeac1] py-[20px] px-[20px] rounded-md mt-6 items-center justify-between'>
            <div className='flex flex-col'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <b>CLASS : </b>
                    <span>{c.className}</span>
                </div>
            </div>
            </div>
            <div className="flex items-center gap-2">
                <b>Teacher Assigned :</b>
                <span>{c.teacherAssigned}</span>
            </div>
            <div className='flex flex-col'>
                <Link to={`/classroom/${c._id}`} className='py-2 px-2 text-[white] bg-[teal] text-sm cursor-pointer rounded-md'>VIEW DETAILS</Link>
            </div>
        </div>
    )
}

export default Classroom
