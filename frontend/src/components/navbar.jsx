import React, { useState } from 'react';
import { assets } from '../assets/assets_admin/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu,setShowMenu] =useState(false)
    const [token,setToken]=useState(true)
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to="/">
          <li className='py-1'>home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink >

        <NavLink to="/doctor">
          <li className='py-1'>all doctors</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to="/about">
          <li className='py-1'>about</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to="/contact">
          <li className='py-1'>contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4' >
        {
            token ? <div>
                <img src="assets/assets_frontend/profile_pic.jpg" alt="Profile Picture" />
<img src="assets/assets_frontend/dropdown/dropdown.jpg" alt="Dropdown" />

            :<button onClick={()=>navigate('/login')}className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>create account </button>
     
        }
      </div>
        
    </div>
  );
};

export default Navbar;