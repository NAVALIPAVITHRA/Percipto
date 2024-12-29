import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Doctor from './pages/doctor'
import Login from './pages/login'
import About from './pages/about'
import Contact from './pages/contact'
import MyProfile from './pages/myprofile'
import Appointment from './pages/appointment'
import MyAppointments from './pages/myappointments'
import Navbar from './components/navbar'
import Home from './pages/home'
import Footer from './components/footer'


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/doctor/:speciality' element={<doctor />} />
        <Route path='/login ' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/appointment:docId' element={<Appointment />} />
        <Route path='/myappointments' element={<MyAppointments />} />



      </Routes>
      <Footer />

      
    </div>
  )
}

export default App