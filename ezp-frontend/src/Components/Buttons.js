import React from 'react'
import { Link } from 'react-router-dom';

export default function Buttons() {
  return (
    <div className='buttons'>
        <div className="buttonContainer">
            <p className="description">
            Start Protecting Your Data Now – Sign Up Today!
            </p>
            <div className="homeButton">
            <Link className="buttonText" to="/main/authenticate"> 
                User
              </Link>
            </div>
        </div>

        <div className="buttonContainer">
            <p className="description">
            Manage Your Compliance Effortlessly – Login to Your Dashboard
            </p>
            <div className="homeButton">
            <Link className="buttonText" to="/admin/authenticate">
                Admin
              </Link>
            </div>
        </div>
    </div>
  )
}
