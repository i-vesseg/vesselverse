import { useState } from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleToggle = () => setMenuOpen(prev => !prev)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <img src="/logo_esteso_trasp.png"/>
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
        <NavLink className={({ isActive }) => isActive ? 'btn active' : 'btn'} to="/paper" onClick={() => setMenuOpen(false)}>The Paper</NavLink>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
