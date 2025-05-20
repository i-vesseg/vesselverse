// src/components/Paper.jsx
import React from 'react';
import './Paper.css';

export default function Paper() {
    const authors = [
        { name: 'Vincenzo', surname: 'Marciano', affiliation: 'EURECOM', email: 'vincenzo.marciano@eurecom.fr' },
        { name: 'Kaiyuan', surname: 'Yang', affiliation: 'University of Zurich', email: 'kaiyuan.yang@uzh.ch' },
        { name: 'Jon', surname: 'Cleary', affiliation: "King's College London", email: 'jon.cleary@kcl.ac.uk' },
        { name: 'Loic', surname: 'Legris', affiliation: 'CHU Grenoble', email: 'legris@chu-grenoble.fr' },
        { name: 'Massimiliano D.', surname: 'Rizzaro', affiliation: 'University of Milan', email: 'massimiliano.rizzaro@unimi.it' },
        { name: 'Ioannis', surname: 'Pitsiorlas', affiliation: 'EURECOM', email: 'ioannis.pitsiorlas@eurecom.fr' },
        { name: 'Hava', surname: 'Chaptoukaev', affiliation: 'EURECOM', email: 'hava.chaptoukaev@eurecom.fr' },
        { name: 'Benjamin', surname: 'Lemasson', affiliation: 'Grenoble Institute of Neuroscience', email: 'benjamin.lemasson@univ-grenoble-alpes.fr' },
        { name: 'Bjoern', surname: 'Menze', affiliation: 'University of Zurich', email: 'bjoern.menze@uzh.ch' },
        { name: 'Maria A.', surname: 'Zuluaga', affiliation: 'EURECOM', email: 'maria.zuluaga@eurecom.fr' },
      ];
      

  return (
    <>
    <section className="highlight-section">
        <div className="hero-content">
        <h1 style={{ marginBottom: '1em' }}>Do you want to learn more about VesselVerse?</h1>
        <a href="/VesselVerse.pdf" download="VesselVerse.pdf" className="btn">
            <i className="fas fa-file-download" style={{ marginRight: '0.5rem' }}></i>
            Download the paper
        </a>
        </div>
    </section>
    <section className="paper-page">
      <img className='desktop-photo' src='/vesselverse rettangolo.png'/>
      <img className='mobile-photo' src='/logo_home.png'/>


      <h1 className="section-heading">Authors</h1>
      <div className="author-main-card">
            <div className="author-name">Daniele</div>
            <div className="author-surname">Falcetta</div>
            <div className="author-affiliation">EURECOM</div>
            <a href="mailto:daniele.falcetta@eurecom.fr" className="author-email">
            daniele.falcetta@eurecom.fr
            </a>
        </div>
      <div className="authors-container">
        {authors.map((author, i) => (
          <div key={i} className="author-card">
            <div className="author-name">{author.name}</div>
            <div className="author-surname">{author.surname}</div>
            <div className="author-affiliation">{author.affiliation}</div>
            <a href={`mailto:${author.email}`} className="author-email">
                {author.email}
            </a>
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
      <p>
        Funding details will be updated soon.
      </p>
    </section>
    </>
  );
}
