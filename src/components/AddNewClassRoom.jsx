import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddNewClassRoom = ({ setAddClassRoom }) => {
    const [sessionDays, setSessionDays] = useState([]);
    const [className, setClassName] = useState('');
    const [teacherAssigned, setTeacherAssigned] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const user = useSelector((state)=>state.user.currentUser)

    const getTeachers = async () =>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/admin/action/${user._id}`)
            let allTeachers = response.data.filter((t,i)=>t.status === "teacher")
            setTeachers(allTeachers)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getTeachers();
    },[])


    const addTosessionDays = (e) => {
        const value = e.target.dataset.value;
        if (!sessionDays.includes(value)) {
            setSessionDays([...sessionDays, value]);
            setSchedule([...schedule, { day: value, startTime: '', endTime: '' }]);
        }
    };

    const handleTimeChange = (e, day, timeType) => {
        const newSchedule = schedule.map((item) => {
            if (item.day === day) {
                return { ...item, [timeType]: e.target.value };
            }
            return item;
        });
        setSchedule(newSchedule);
    };

    const addNewClassRoom = async (e) => {
        e.preventDefault();
        // console.log("this is the test",{ className, teacherAssigned, schedule, inSessionDays:sessionDays });
        try{
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/classroom/create`,{ className, teacherAssigned, schedule, inSessionDays:sessionDays , userId:user._id})

            response.status === 200 && setAddClassRoom(false)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    };

    return (
        <div className='w-[40%] flex items-center justify-center py-5 min-h-[50%] rounded-md absolute top-[50%] left-[50%] bg-[white]' style={{ transform: "translate(-50%, -50%)" }}>
            <form className='flex flex-col gap-2 w-[80%]'>
                <input
                    className='py-2 px-4 border border-[teal] outline-none'
                    type='text'
                    placeholder='Enter the class name'
                    onChange={(e) => setClassName(e.target.value)}
                />
                <select
                    className='py-2 px-4 border border-[teal] outline-none'
                    onChange={(e) => setTeacherAssigned(e.target.value)}
                >
                    <option value={null}>Select teacher</option>
                    {
                        teachers.length > 0 &&
                        teachers?.map((t,i)=><option key={i} value={t.username}>{t.username}</option>
                    )
                    }
                </select>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-wrap px-4 py-2 border border-[teal] gap-2'>
                        {sessionDays.length > 0 ? (
                            sessionDays.map((elem, i) => (
                                <span key={i} className='px-2 py-1 bg-[lightgrey]'>{elem}</span>
                            ))
                        ) : (
                            <span className='text-[grey] text-center w-[100%]'>Select session days</span>
                        )}
                    </div>
                    <div className="flex gap-3 flex-wrap items-center justify-center">
                        {weekDays.map((e, i) => (
                            <span
                                data-value={e}
                                className='px-2 py-1 bg-[teal] text-[white] rounded-sm cursor-pointer'
                                key={i}
                                onClick={addTosessionDays}
                            >
                                {e}
                            </span>
                        ))}
                    </div>
                    <div className='flex flex-col'>
                        <b className='text-center'>SELECT CLASS TIMINGS</b>
                        <div className="flex gap-2">
                            <div className="flex gap-2 flex-col">
                                {sessionDays.map((e, i) => (
                                    <span key={i} className='px-4 py-1 bg-[teal] text-[white]'>{e}</span>
                                ))}
                            </div>
                            <div className="flex gap-2 flex-col">
                                {sessionDays.length > 0 && sessionDays.map((day, i) => {
                                    return (
                                        <div className='flex items-center justify-center bg-[lightgrey] px-4 py-1 gap-2' key={i}>
                                            <input
                                                type='text'
                                                placeholder='Start time'
                                                className='border-0 outline-none w-[30%] px-4 rounded-sm'
                                                value={schedule.find(s => s.day === day)?.startTime || ''}
                                                onChange={(e) => handleTimeChange(e, day, 'startTime')}
                                            />
                                            <input
                                                type='text'
                                                placeholder='End time'
                                                className='border-0 outline-none w-[30%] px-4 rounded-sm'
                                                value={schedule.find(s => s.day === day)?.endTime || ''}
                                                onChange={(e) => handleTimeChange(e, day, 'endTime')}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start justify-between">
                    <input
                        type='submit'
                        value="Cancel"
                        className='py-2 px-4 bg-[tomato] text-[white] rounded-md cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            setAddClassRoom(false);
                        }}
                    />
                    <input
                        type='submit'
                        value="Confirm"
                        className='py-2 px-4 bg-[teal] text-[white] rounded-md cursor-pointer'
                        onClick={addNewClassRoom}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddNewClassRoom;

