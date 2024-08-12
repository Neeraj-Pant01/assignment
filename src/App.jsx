import React from 'react'
import Homepage from './pages/Homepage'
import ClassRoom from './pages/ClassRoom'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'

const App = () => {
  const user = useSelector((state)=>state.user.currentUser)
  return (
    <>
    {!user && <Navbar />}
    <Routes>
      <Route path='/' element={user ? <Homepage /> : <Navigate to={'/login'} />} />
      <Route path='/classroom/:id' element={user ? <ClassRoom /> : <Navigate to={'/login'} /> } />
      <Route path='/login' element={<Login />} />
    </Routes>
    </>
  )
}

export default App
