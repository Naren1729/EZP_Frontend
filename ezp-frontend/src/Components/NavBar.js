import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='nav-bar'>
        <ul className='nav-items'>
        <li><Link to="/">Home</Link ></li>
        <li><Link to="#about">About</Link ></li>
        <li><Link to="#features">Features</Link ></li>
        <li><Link to="#team">Our Team</Link ></li>
      </ul>
    </div>
  )
}
