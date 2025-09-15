// src/components/Paper.jsx
import React from 'react';
import './Paper.css';

export default function Paper() {
    const authors = [
        { name: 'Vincenzo', surname: 'Marciano', affiliation: 'EURECOM'},
        { name: 'Kaiyuan', surname: 'Yang', affiliation: 'University of Zurich'},
        { name: 'Jon', surname: 'Cleary', affiliation: "King's College London"},
        { name: 'Loic', surname: 'Legris', affiliation: 'CHU Grenoble'},
        { name: 'Massimiliano D.', surname: 'Rizzaro', affiliation: 'University of Milan'},
        { name: 'Ioannis', surname: 'Pitsiorlas', affiliation: 'EURECOM'},
        { name: 'Hava', surname: 'Chaptoukaev', affiliation: 'EURECOM'},
        { name: 'Benjamin', surname: 'Lemasson', affiliation: 'Grenoble Institute of Neuroscience' },
        { name: 'Bjoern', surname: 'Menze', affiliation: 'University of Zurich'},
        { name: 'Maria A.', surname: 'Zuluaga', affiliation: 'EURECOM'},
      ];
      

  return (
    <>
    <section className="highlight-section">
        <div className="hero-content">
            <h1 style={{ marginBottom: '1em' }}>Do you want to learn more about VesselVerse?</h1>
            <div className='button-paper'>
                <a href="/VesselVerse.pdf" download="VesselVerse.pdf" className="btn">
                    <i className="fas fa-file-download" style={{ marginRight: '0.5rem' }}></i>
                    Download the paper
                </a>
                <a
                    href="https://anonymous.4open.science/r/VesselverseDatasets"
                    target="_blank"
                    className="btn clickable"
                    >
                    <img className='btn' src='/github_icon.png'/>
                    More about the Dataset
                </a>
                <a
                    href="https://anonymous.4open.science/r/VesselverseModule"
                    target="_blank"
                    className="btn clickable"
                >
                    <img className='btn' src='/github_icon.png'/>
                    More about the Framework
                </a>
            </div>
        </div>
    </section>
    <section className="paper-page">
      <img className='desktop-photo' src='/vesselverse rettangolo.png'/>
      <img className='mobile-photo' src='/logo_home.png'/>

      {/* ---------- CONTACT  ---------- */}
      <h1 className="section-heading">Contact</h1>
      <div className="contact-wrap">
        <p className="contact-subtitle">
          Questions about VesselVerse? Reach out to the project contacts below.
        </p>
        <div className="contact-grid">
          {/* Daniele */}
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

          {/* Maria */}
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

      {/* ---------- AUTHORS ---------- */}

      <h1 className="section-heading">Authors</h1>
      <div className="author-main-card">
            <div className="author-name">Daniele</div>
            <div className="author-surname">Falcetta</div>
            <div className="author-affiliation">EURECOM</div>
        </div>
      <div className="authors-container">
        {authors.map((author, i) => (
          <div key={i} className="author-card">
            <div className="author-name">{author.name}</div>
            <div className="author-surname">{author.surname}</div>
            <div className="author-affiliation">{author.affiliation}</div>
        </div>
        ))}
      </div>

      <h2 className="section-heading">Citation</h2>
      <p>If you use VesselVerse, please cite:</p>
      <pre className="bibtex-block">
{`@inproceedings{falcetta2025vesselverse,
  title     = {VesselVerse: A Dataset and Collaborative Framework for Vessel Annotation},
  author    = {Daniele Falcetta and Vincenzo Marciano and Kaiyuan Yang and Jon Cleary and Loic Legris and Massimiliano D. Rizzaro and Ioannis Pitsiorlas and Hava Chaptoukaev and Benjamin Lemasson and Bjoern Menze and Maria A. Zuluaga},
  booktitle = {Proceedings of the International Conference on Medical Image Computing and Computer-Assisted Intervention (MICCAI)},
  year      = {2025},
  note      = {Early accepted — among the top 9\% of submissions}
}
`}
      </pre>

      <h2 className="section-heading">Funding</h2>
      <div className='funding'>
        <img src='/ANR-funded-project.jpg'/>
        <img src='/EN_fundedbyEU_VERTICAL_RGB_POS.png'/>
      </div>
    </section>
    </>
  );
}
