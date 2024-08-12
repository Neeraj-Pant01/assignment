import axios from 'axios';
import React, { useRef, useState } from 'react'

const AddTimeTabel = ({s,id}) => {
    const [lectures, setLectures] = useState([])
    const formRef = useRef();
    const [added, setAdded] = useState(false)

    console.log("c", s)

    const addTolectures = (e) =>{
        e.preventDefault();
        setLectures([...lectures,{name:e.target[0].value, timing:e.target[2].value, day:e.target[1].value} ])
        formRef.current.reset();
    }
    const ConfirMTimeTable = async (e) =>{
        e.preventDefault();
        const data = {
            classRoomId :id ,
            day:s.day,
            lectures:lectures
        }
        try{
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/timetable/create`,data)
            console.log(response.data)
            response.status === 200 && setAdded(true)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <>
    {
        added ? 
        <div className="w-[40%] gap-3 border-2 flex flex-col items-center justify-center text-[green] h-[100px]">
            Added successfully !
        </div>
         :

        <div className='w-[40%] gap-3 border-2 flex flex-col items-center justify-center'>
        <form className='gap-5 py-3 px-5' ref={formRef} onSubmit={addTolectures}>
            <div className="flex gap-3 items-center justify-between">
            <input type='text' className='border-2 outline-none w-[50%] py-2 px-4' placeholder='subject name'/>
            <input type='text' defaultValue={s?.day} className='border-2 outline-none w-[50%] py-2 px-4' placeholder='Day'/>
            <input type='text' className='border-2 outline-none w-[50%] py-2 px-4' placeholder='timings' />
            <button className='py-2 px-4 bg-[teal] text-[white] rounded-md'>Add</button>
            </div>
        </form>
        {
            lectures.length > 0 &&
            <div className="flex flex-col gap-2 w-[100%] items-center justify-center">
                {
                        lectures.map((l,i)=>{
                return (
                    <div key={i} className='flex w-[90%] items-center justify-between'>
                        <div className='flex gap-2 items-center'>
                            <b>{l.name && "Name :"}</b>
                            <span>{l.name}</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                            <b>{l.day && "Day :"}</b>
                            <span>{l.day}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                            <b>{l.timing && "Timing :"}</b>
                            <span>{l.timing}</span>
                            </div>
                        </div>
                )
            })
        }
        <button className='px-4 py-1 mt-3 bg-[teal] text-[white] rounded-md' onClick={ConfirMTimeTable}>Confirm</button>
            </div>
        }
        </div>
    }
    </>
  )
}

export default AddTimeTabel
