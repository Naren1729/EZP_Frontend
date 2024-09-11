/**
 * @author Mayuri
 * @description This component contains the two buttons for user login and admin login.
 */

import React from 'react'
import { Link } from 'react-router-dom'; //Imported Link for smooth routing among the pages

export default function Buttons() {
  return (
    <div className='buttons'>
      {/* User Login Button */}
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

        {/* Admin Login Button */}
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
