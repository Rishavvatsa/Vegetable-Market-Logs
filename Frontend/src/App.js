import React,{useEffect, useState}from 'react'

import { Route,Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import {Toaster} from "react-hot-toast"
import Header from './Pages/Navbar'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Forget from './Pages/Forget'
import Addcontainer from './Components/Addcontainer'
import Menu from './Pages/Menu'
import { useDispatch,useSelector } from 'react-redux'
import { setDataProduct } from './utils/ProductSlice'
import Cart from './Pages/Cart'
import Success from "./Pages/success"
import Cancel from './Pages/cancel'
import Analytics from './Pages/Analytics'
import Dashboard from './Components/Dashboard/Dashboard'

import Address from './Pages/address'
import ProductSearch from './Components/ProductSearch'





const App = () => {
 
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}api/products`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
    
    })()
  },[])


  return (        
       <main>   
        <Toaster/>       
       <Header/>
      
       <Routes>
        
        <Route path='/' element={<Home/>} />
       
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about'element={<About/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgotpassword' element={<Forget/>} />   
        <Route path='/newproduct'element={<Addcontainer/>} />  
        <Route path="menu/:filterby" element={<Menu/>} />
        <Route path='/cart' element={<Cart/>} />
       <Route path='/success' element={<Success/>} />
       <Route path='/cancel' element={<Cancel/>} />     
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path='/address' element={<Address/>}/>
       <Route path='/search' element={<ProductSearch/>} />
       <Route path='/Analytics' element={<Analytics/>}/>
       </Routes>
       
      </main>
       
       
  
  )
}

export default App
