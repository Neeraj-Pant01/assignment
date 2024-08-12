import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Student = ({s,setShowStudents}) => {
  const user = useSelector((state)=>state.user.currentUser)
  const [enableEdit, setEnableEdit] = useState(false)
  const [updatedData, setUpdatedData] = useState({
    username : s?.username,
    email : s?.email,
    userId : user?._id
  })

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setUpdatedData((prev)=>{
      return {...prev, [name]:value}
    })
  }

  const handleUpdate = async (e) =>{
    e.preventDefault()
    try{
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/update/${s?._id}`,updatedData)
      response.status === 200 && setEnableEdit(false)
      setShowStudents(false)
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (e) =>{
    e.preventDefault()
    try{
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/remove/${s?._id}`,{headers: {
        'User-ID': user?._id
    }})
      setShowStudents(false)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='flex items-center justify-between border py-2 px-2'>
      {/* <span className='mr-20 text-[grey]'>{s.username}</span>
      <span className='text-[grey]'>{s.email}</span> */}
            {
        enableEdit ?
        <form className='flex items-center justify-between gap-2'> 
        <input type='text' name='username' value={updatedData.username} className='px-4 py-2 border-2 rounded-md outline-none text-[14px]' onChange={handleChange} />
        <input type='text' name='email' value={updatedData.email} className='px-4 py-2 text-[14px] border rounded-md outline-none' onChange={handleChange} />
        </form>
          :
          <>
          <span className='mr-20 text-[grey]'>{s.username}</span>
          <span className='text-[grey]'>{s.email}</span>
          </>
      }
      { enableEdit ?
      <button className='px-4 py-2 text-[white] text-[14px] bg-[teal] rounded-md ml-2' onClick={handleUpdate}>save</button>
      :
      <div className='flex items-center gap-4'>
      <div className="flex cursor-pointer" onClick={()=>setEnableEdit(true)}>
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
  )
}

export default Student
