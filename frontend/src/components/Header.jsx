import React from 'react'
import { assets_frontend } from '../assets/assets_frontend/assets_frontend'

const Header = () => {
  return (
    <div>
        {/*--------------------ls------------------*/}
        <div>
            <p>
                Book Appointment <br />With Trusted Doctors
            </p>
            <div>
                <img src={assets_frontend.group_profiles} alt = " "/>
                <p>Simply browser through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free</p>
            </div>
            <a href="">
                Book appointment <img src={assets_frontend.arrow_icon} alt=" "/>
            </a>
        </div>
    </div>
  )
}

export default Header
