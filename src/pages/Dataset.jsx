import React from 'react'
import { Link } from 'react-router-dom'
import DatasetExplorer from '../components/DatasetExplorer'
import './Dataset.css'

function Dataset() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="dataset-page">
      <header className="dataset-hero">
        <h1 style={{ marginBottom: '0.5em', color: 'black' }}>
          The VesselVerse Dataset:
        </h1>
        <p className="hero-subtitle" style={{ color: 'black' }}>
          The Largest Collection of Brain Vessel Annotations
        </p>
        <DatasetExplorer />
      </header>
      <div className="inside-container">
        <section className="info-section">
          <h2 className="section-title">What's Inside VesselVerse?</h2>
          <div className="content-row first-row">
            <p style={{ textAlign: 'start' }}>
              The <strong>VesselVerse database</strong> is the largest publicly available collection of brain vessel annotations to date, comprising <strong>1,130 images</strong> from three major datasets: <strong>IXI</strong>, <strong>TubeTK</strong>, and <strong>TopCoW</strong>.<br/>These images cover multiple imaging modalities including <strong>TOF-MRA</strong> (Time-of-Flight Magnetic Resonance Angiographies) and <strong>CTA</strong> (Computed Tomography angiographies).<br/>
              Each image in the database is associated with <strong>multiple expert-level annotations</strong> (including both <strong>manual</strong> and <strong>automatically generated</strong> segmentations). The automated annotations were produced by a range of state-of-the-art models such as <strong>nnU-Net</strong>, <strong>A2V</strong>, <strong>SPOCKMIP (S-MIP in the table below)</strong>, <strong>VesselBoost (VB)</strong>, <strong>JOB-VS</strong>, and <strong>StochasticBatchAL (SB-AL)</strong>, as well as traditional techniques like the <strong>Frangi filter (FF)</strong>.<br/>
              For each dataset, VesselVerse also provides a <strong><Link to="/framework#pillars" style={{ color: '#ff6565' }}>STAPLE-based consensus annotation</Link></strong>, allowing users to access high-confidence segmentations derived from multiple inputs.
            </p>
            <a
              href="https://github.com/i-vesseg/VesselVerse-Dataset"
              target="_blank"
              className="btn clickable"
              rel="noopener noreferrer"
            >
              <img className='btn' src={`${base}github_icon.png`} alt="" />
              More about the Dataset
            </a>
          </div>
        </section>
        <section className="info-section">
          <h2 className="section-title" style={{ textAlign: 'end' }}>
            The expert annotations
          </h2>
          <p style={{ textAlign: 'end' }}>
            Each image in VesselVerse can have up to <strong>nine expert-level annotations</strong>, combining both <strong>manual input</strong> and <strong>algorithmic outputs</strong>. Beyond traditional expert-guided annotations and <strong>Frangi filter-derived labels</strong>, six different models were employed to generate automated segmentations. These include <strong>nnU-Net</strong> and <strong>A2V</strong> (notable for handling both <strong>CTA</strong> and <strong>MRA</strong>), as well as <strong>SPOCKMIP</strong>, <strong>VesselBoost</strong>, <strong>JOB-VS</strong>, and <strong>StochasticBatchAL</strong>, which refines outputs using active learning. The models for <strong>MRA</strong> were trained on 22 manually labeled images from the <strong>IXI dataset</strong>, while <strong>CTA</strong> models were fine-tuned on corrected <strong>Frangi-based labels</strong>.
          </p>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th colSpan="3"></th>
                  <th colSpan="9">Available Annotations</th>
                </tr>
                <tr>
                  <th>Dataset</th>
                  <th>#Images</th>
                  <th>#Annot.</th>
                  <th>MA</th>
                  <th>FF</th>
                  <th>nnU-Net</th>
                  <th>A2V</th>
                  <th>S-MIP</th>
                  <th>VB</th>
                  <th>JOB-VS</th>
                  <th>SB-AL</th>
                  <th>CA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IXI TOF-MRA</td>
                  <td>600</td>
                  <td>4,822</td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                </tr>
                <tr>
                  <td>TubeTK T1-MRA</td>
                  <td>100</td>
                  <td>800</td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="red-x">✕</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                </tr>
                <tr>
                  <td>TopCoW MRA</td>
                  <td>215</td>
                  <td>1720</td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="red-x">✕</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                </tr>
                <tr>
                  <td>TopCoW CT</td>
                  <td>215</td>
                  <td>1085</td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="red-x">✕</span></td>
                  <td><span className="red-x">✕</span></td>
                  <td><span className="green-check">✓</span></td>
                  <td><span className="red-x">✕</span></td>
                  <td><span className="green-check">✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dataset;
