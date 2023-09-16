import React from 'react'
import "../Css/Home.css"

import Carosel from './Carousel'
import Homecategory from './Homecategory'
import Footer from './Footer'

import Menuslider from './Menuslider'


const Home = (props) => {
  return (
    <>
    
    <Carosel/>
    <Homecategory/>
    <Menuslider/>
    
    <Footer/>
    </>
  )
}

export default Home
