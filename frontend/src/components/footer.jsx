import React from 'react'
import { assets_frontend } from '../assets/assets_frontend/assets_frontend'

const footer = () => {
  return (
    <div className='md:mx-10'>
        
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*left */}
            <div>
              <img  className='mb-5 w-40' src={assets_frontend.logo} alt="" />
               <p className='w-full md:w-2/3 text-gray-600 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat fuga dolor porro magni, molestiae qui temporibus, accusamus voluptatum, vel delectus neque sint consectetur obcaecati dolorem ipsam beatae voluptatem et maxime.</p>
            </div>
             {/*center */}
            <div>
             <p className='text-sm font-medium mb-5'> COMPANY</p>
             <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
             </ul>
          
            </div>
              {/*right */}
            <div>
                <p className='text-sm font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>doctorscenter@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'> Copyright 2024@ Prescripto -All Rights Reserved.</p>

        </div>
    </div>
  )
}

export default footer