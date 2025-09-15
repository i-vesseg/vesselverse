import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const base = import.meta.env.BASE_URL

  return (
    <footer className='big-footer'>
      <div className="footer">
        <div className="footer-container1">
          <img src={`${base}logo_esteso_trasp.png`} className='logo-footer' alt="VesselVerse" />
          Copyright © 2025 | EURECOM | All rights reserved.
        </div>
        <div className="footer-container2">
          <div className='line-footer'>
            <img src={`${base}Al4Health.png`} alt="Al4Health@EURECOM"/>
            <span className='partOf'>part of Al4Health@EURECOM</span> 
          </div>
          <div className='line-footer'>
            <img src={`${base}logo_alex.png`} alt="Alex Argese"/>
            <span className='partOf'>Website, graphics & animations by <strong>
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{color:'#ff4081'}}
                href="https://alexargese.github.io"
              >
                Alex Argese
              </a>
            </strong></span> 
          </div>
        </div>
      </div>
      <p className="footer-note">
        Some images on this website are AI-generated.
      </p>
    </footer>
  )
}

export default Footer
