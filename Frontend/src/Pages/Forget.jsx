import React,{useState}  from 'react'
import { Link } from 'react-router-dom'
import "../Css/Auth.css"
import {BiShow,BiHide} from "react-icons/bi"
const Forget = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
      setShowPassword(prev => !prev);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowConfirmPassword = () => {
      setShowConfirmPassword(prev => !prev);
    };
  return (
    <div className='authpage'>
         
            <div className='authcont'>
                <img src='https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                    alt='signup' />

                <form className='authform'>
                    <h1>Forgot Password</h1>
                   
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' />
                    </div>

                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='password'>Password</label>
                            <input type={showPassword ? "text" : "password"}  id='password' />
                            <div className='password-input'>                                  
                            <span className='password-toggle' onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
                        </div>
                        </div>
                        <div className='formgroup'>
                        <label htmlFor='cpassword'>Confirm New Password</label>
                        <input type={showConfirmPassword ? "text" : "password"} id='cpassword' />
                        <div className='password-input'>
                            <span className='password-toggle' onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
                        </div>
                    </div>
                    </div>

                    <Link to='/login'
                        className='stylenone'
                    >
                        <p>Try Login again?</p>
                    </Link>
                    <Link to='/signup'
                        className='stylenone'
                    >
                        <button className='btn'>Verify</button>
                    </Link>
                </form>
            </div>
        </div>
  )
}

export default Forget
