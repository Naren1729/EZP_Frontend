import React from 'react'
import Login from '../Components/Login'
import { Link } from 'react-router-dom'

export default function UserLogin() {
  return (
    <>
    <div className="loginContainer">
      <div className="leftDiv">
        <img src="/User-Login.png" alt="" sizes="" srcset="" />
      </div>
      <div className="rightDiv">
        <Login title = "User"/>
        <Link to="/main/userDepositForm" className='depositFunds'>Deposit Funds!</Link>
      </div>
    </div>
    </>
  )
}
