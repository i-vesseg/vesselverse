import React from 'react'
import Pillars from '../components/Pillars'
import VesselAnimation from '../components/VesselAnimation'
import './Framework.css'
import ScrollToHash from '../components/ScrollToHash'

function Framework() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="framework-page">
      <ScrollToHash />
      <VesselAnimation />
      <div className="hero-overlay">
        <h1 className="hero-title">The VesselVerse Framework</h1>
        <p className="hero-subtitle" style={{ color: 'white' }}>
          A collaborative system integrating expert annotations and AI models
          for accurate brain vessel segmentation.
        </p>
      </div>
      <section className="info-section no-pointer">
        <h2 className="section-title">How does VesselVerse Framework work?</h2>
        <div className="content-row first-row">
          <p>
            The <strong>VesselVerse framework</strong> is a collaborative system
            designed to manage, refine, and enhance brain vessel annotations over
            time. It brings together contributions from multiple experts and
            automated tools, enabling users to compare, evaluate, and improve
            annotations within a unified environment. The framework is integrated
            as a <strong>3D Slicer extension</strong> and supports full{' '}
            <strong>multi-source annotations</strong>,{' '}
            <strong>consensus generation</strong> and{' '} <strong>version control</strong>, making it a powerful tool for
            producing high-quality, traceable, and adaptable segmentation datasets.
          </p>
          <a
            href="https://anonymous.4open.science/r/VesselverseModule"
            target="_blank"
            className="btn clickable"
            rel="noopener noreferrer"
          >
            <img className="btn" src={`${base}github_icon.png`} alt="" />
            More about the Framework
          </a>
        </div>
      </section>
      <div id="pillars">
        <Pillars />
      </div>
    </div>
  )
}

export default Framework
