import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css' 

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleToggle = () => setMenuOpen(prev => !prev)

  const base = import.meta.env.BASE_URL

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <img src={`${base}logo_esteso_trasp.png`} alt="VesselVerse" />
        </div>
        <button className="nav-toggle" onClick={handleToggle}>
          {menuOpen ? '▼' : (
            <>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </>
          )}
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} to="/dataset" onClick={() => setMenuOpen(false)}>Dataset</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} to="/framework" onClick={() => setMenuOpen(false)}>Framework</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} to="/learn-more" onClick={() => setMenuOpen(false)}>Learn More</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'nav-btn-fill active' : 'nav-btn-fill'} to="/paper" onClick={() => setMenuOpen(false)}>
            The Paper
            <img src={`${base}github_icon.png`} alt="" />
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
