import React from 'react'
import Header from '../components/Header'
import SpecialMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
const Home = () => {
  return (
    <div>
     <Header />
     <SpecialMenu />
     <TopDoctors />
     <Banner />
    </div>
  )
}

export default Home