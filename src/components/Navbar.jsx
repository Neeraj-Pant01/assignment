import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const user = useSelector((state)=>state.user?.currentUser)
  const handleLogOut = () =>{
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div className='flex items-center justify-end sticky top-0 border z-[999] bg-[white] py-3 px-10'>
      <div className='flex items-center gap-4'>
        <span className='text-[teal]'>{user?.username}</span>
        <b className='cursor-pointer' onClick={handleLogOut}>Log Out</b>
      </div>
    </div>
  )
}

export default Navbar
