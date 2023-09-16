import React from 'react'
import "../Css/style.css"
import Footer from './Footer'
import B1 from "../Pages/Banner/B1"
import i1 from "../assets/catergory/i1.jpg"

const About = () => {
  return (
    <div className="extrapages relative top-20 bottom-10">
     <B1
                heading="About Us"
                bannerimage= {i1}
            />
            <div className='pgright pgcommon'>
            <img src='https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt='noimg' />

            <div>
                <h1>Who are we</h1>
                <p>Welcome to Online E-Sabjiwala, your one-stop destination for the freshest and finest quality vegetables delivered right to your doorstep. We're here to make your grocery shopping experience more convenient, healthier, and hassle-free.At Online Sabjiwala, we understand the importance of fresh produce in your daily life. That's why we've dedicated ourselves to sourcing and delivering the best quality vegetables, carefully handpicked from local farms and trusted suppliers. Our commitment to freshness ensures that you receive vegetables that are bursting with flavor and nutritional value.</p>

            </div>
        </div>
            <Footer/>
    </div>
  )
}

export default About
