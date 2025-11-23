import React from 'react'
import './Paper.css'

export default function Paper() {
  const base = import.meta.env.BASE_URL

  const authors = [
    { name: 'Vincenzo', surname: "Marciano'", affiliation: 'EURECOM'},
    { name: 'Kaiyuan', surname: 'Yang', affiliation: 'University of Zurich'},
    { name: 'Jon', surname: 'Cleary', affiliation: "King's College London"},
    { name: 'Loic', surname: 'Legris', affiliation: 'CHU Grenoble'},
    { name: 'Massimiliano D.', surname: 'Rizzaro', affiliation: 'University of Milan'},
    { name: 'Ioannis', surname: 'Pitsiorlas', affiliation: 'EURECOM'},
    { name: 'Hava', surname: 'Chaptoukaev', affiliation: 'EURECOM'},
    { name: 'Benjamin', surname: 'Lemasson', affiliation: 'Grenoble Institute of Neuroscience' },
    { name: 'Bjoern', surname: 'Menze', affiliation: 'University of Zurich'},
    { name: 'Maria A.', surname: 'Zuluaga', affiliation: 'EURECOM'},
  ]

  const affiliationLogos = {
    'EURECOM': 'EURECOM_logo.png',
    'University of Zurich': 'UZ.png',
    "King's College London": "King's_College_London_logo.svg.png",
    'CHU Grenoble': 'CHU_Grenoble.png',
    'University of Milan': 'UMilan.png',
    'Grenoble Institute of Neuroscience': 'GIN.svg'
  }

  const logoForAffiliation = (aff) => {
    const file = affiliationLogos[aff] || null
    return file ? `${base}logos/${file}` : null
  }

  return (
    <>
      <section className="highlight-section">
        <div className="hero-content">
          <h1 style={{ marginBottom: '1em' }}>Do you want to learn more about VesselVerse?</h1>
          <div className='button-paper'>
          <a
              href="https://papers.miccai.org/miccai-2025/paper/0087_paper.pdf"
              target="_blank"
              className="btn clickable"
              rel="noopener noreferrer"
            >
              <i className="fas fa-file-download" style={{ marginRight: '0.5rem' }}></i>
              Download the paper
            </a>
            <a
              href="https://github.com/i-vesseg/VesselVerse-Dataset"
              target="_blank"
              className="btn clickable"
              rel="noopener noreferrer"
            >
              <img className='btn' src={`${base}github_icon.png`} alt="" />
              More about the Dataset
            </a>
            <a
              href="https://github.com/i-vesseg/VesselVerse-Framework"
              target="_blank"
              className="btn clickable"
              rel="noopener noreferrer"
            >
              <img className='btn' src={`${base}github_icon.png`} alt="" />
              More about the Framework
            </a>
          </div>
        </div>
      </section>

      <section className="paper-page">
        <img className='desktop-photo' src={`${base}vesselverse_rettangolo.png`} alt="" />
        <img className='mobile-photo' src={`${base}logo_home.png`} alt="" />

        <h1 className="section-heading">Authors</h1>
        <div className="author-main-card">
          <div className="main-content">
            <div className="author-fullname">Daniele Falcetta</div>
            <div className="author-affiliation">EURECOM</div>
          </div>
          <img
            src={logoForAffiliation('EURECOM')}
            alt="EURECOM logo"
            className="author-logo-main"
          />
        </div>
        <div className="authors-container">
          {authors.map((author, i) => (
            <div key={i} className="author-card">
              {logoForAffiliation(author.affiliation) && (
                <img
                  className="author-logo"
                  src={logoForAffiliation(author.affiliation)}
                  alt={`${author.affiliation} logo`}
                />
              )}
              <div className="author-fullname">{`${author.name} ${author.surname}`}</div>
              <div className="author-affiliation">{author.affiliation}</div>
            </div>
          ))}
        </div>

        <h2 className="section-heading">Citation</h2>
        <p>If you use VesselVerse, please cite:</p>
        <pre className="bibtex-block">
{`@InProceedings{ FalDan_VesselVerse_MICCAI2025,
  author = { Falcetta, Daniele and Marciano, Vincenzo and Yang, Kaiyuan and Cleary, Jon and Legris, Loïc and Rizzaro, Massimiliano Domenico and Pitsiorlas, Ioannis and Chaptoukaev, Hava and Lemasson, Benjamin and Menze, Bjoern and Zuluaga, Maria A. },
  title = { { VesselVerse: A Dataset and Collaborative Framework for Vessel Annotation } }, 
  booktitle = {Medical Image Computing and Computer Assisted Intervention -- MICCAI 2025},
  year = {2025},
  publisher = {Springer Nature Switzerland},
  volume = { LNCS 15972 },
  month = {October},
  pages = { 656 -- 666 }
}
`}
        </pre>

        <h1 className="section-heading">Contact</h1>
        <div className="contact-wrap">
          <p className="contact-subtitle">
            Questions about VesselVerse? Reach out to the project contacts below.
          </p>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-avatar" aria-hidden="true">DF</div>
              <div className="contact-id">
                <span className="contact-name">Daniele</span>
                <span className="contact-surname">Falcetta</span>
              </div>
              <a href="mailto:daniele.falcetta@eurecom.fr" className="contact-btn">
                <span className="contact-btn-icon" aria-hidden="true"></span>
                daniele.falcetta@eurecom.fr
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-avatar" aria-hidden="true">MZ</div>
              <div className="contact-id">
                <span className="contact-name">Maria A.</span>
                <span className="contact-surname">Zuluaga</span>
              </div>
              <a href="mailto:maria.zuluaga@eurecom.fr" className="contact-btn">
                <span className="contact-btn-icon" aria-hidden="true"></span>
                maria.zuluaga@eurecom.fr
              </a>
            </div>
          </div>
        </div>

        <h2 className="section-heading">Funding</h2>
        <div className='funding'>
          <img src={`${base}ANR-funded-project.jpg`} alt="" />
          <img src={`${base}new_fundingEU.png`} alt="" />
        </div>
      </section>
    </>
  )
}
