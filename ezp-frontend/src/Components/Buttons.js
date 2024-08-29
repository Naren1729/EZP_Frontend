import React from 'react'

export default function Buttons() {
  return (
    <div className='buttons'>
        <div className="buttonContainer">
            <p className="description">
            "Start Protecting Your Data Now – Sign Up Today!"
            </p>
            <div className="button">
              <p className="buttonText">
                User
              </p>
            </div>
        </div>

        <div className="buttonContainer">
            <p className="description">
            Manage Your Compliance Effortlessly – Login to Your Dashboard
            </p>
            <div className="button">
              <p className="buttonText">
                Admin
              </p>
            </div>
        </div>
    </div>
  )
}
