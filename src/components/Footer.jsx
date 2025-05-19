import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src="/logo_esteso_trasp.png"/>
        <div className="footer-icons">
          <Link to="https://anonymous.4open.science/r/VesselverseDatasets" target="_blank" className="icon-link">
            <i className="fab fa-github" aria-hidden="true"></i>
          </Link>
        </div>
        <p className="footer-copy">
          Copyright © 2025 | EURECOM | All rights reserved.<br/>
          Website created by <strong>
            <a target="_blank"
            rel="noopener noreferrer"
            style={{color:'#ff4081'}}
            href='https://alexargese.github.io'>Alex Argese
            </a>
          </strong>
        </p>
      </div>
    </footer>
  )
}

export default Footer
