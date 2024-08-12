import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlice'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(e.target[0].value)
        console.log(e.target[1].value)   
        try{
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/login`,{
                email:e.target[0].value,
                password:e.target[1].value
            })
            response.status === 200 && dispatch(login(response.data))
            response.status === 200 && navigate('/')
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='bg-[#215050] h-screen flex items-center justify-center'>
      <form className='p-5 flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type='text' className='bg-[white] px-4 py-2 text-[grey] w-[400px] rounded-lg' placeholder='enter username' />
        <input type='password' className='bg-[white] px-4 py-2 text-[grey] rounded-lg' placeholder='enter password' />
        <input type='submit' className='bg-[lightgrey] py-2 px-4 rounded-lg cursor-pointer font-bold mt-5 text' value={"Login"} />
      </form>
    </div>
  )
}

export default Login
