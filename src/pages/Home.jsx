import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVideoEnded = () => {
    setVideoEnded(true);
    if (window.scrollY === 0) {
      const firstSection = document.querySelector('.fade-box');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className='home'>
      <section className='hero'>
        <video
          className={`hero-video ${videoEnded ? 'video-faded' : ''}`}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
        >
          <source src="/intro_sito.mp4" type="video/mp4" />
          Your browser does not support the video.
        </video>

        <div className="hero-content">
          <div className="fade-box">
            <img src="/logo_home.png"/>
          </div>
        </div>
      </section>

      <section className="info-section first-section">
        <h2 className="section-title">What is VesselVerse?</h2>
        <div className="content-row first-row">
          <div className="col-left">
            <p>
              <strong>VesselVerse</strong> is a <strong>large-scale dataset</strong> and <strong>collaborative framework</strong> designed for annotating brain vessels in medical images. It comprises <strong>1,130 annotated images</strong> drawn from three public datasets using different neurovascular imaging modalities, and supports <strong>multiple expert annotations</strong> per image. The framework integrates tools for <strong>consensus generation</strong>, <strong>quality control</strong>, and <strong>version tracking</strong>.
            </p>
          </div>
          <div className="col-right">
            <a href="/dataset" className="btn">Explore the Dataset</a>
            <a href="/framework" className="btn">Explore the framework</a>
          </div>
        </div>
      </section>

      <section className="info-section second-section">
        
        <h2 className="section-title second-title">
          Why is it important?
        </h2>
        <div className="content-row sec-row">
          <div className="col-left">
            <a href="/learn-more" className="btn">Learn more</a>
          </div>
          <div className="col-right">
            <p className='mobile-text'>
              VesselVerse addresses a major challenge in medical imaging: <strong>the lack of high-quality, large-scale annotated datasets</strong> for the complex anatomical structures of cerebral vasculature. It increases the <strong>reliability and reproducibility</strong> of training data for machine learning models thanks to the support of multi-expert input and version-controlled refinement.
            </p>
            <p className='mobile-text'>
              Moreover, the collaborative framework offers a sustainable way to <strong>maintain and improve dataset quality over time</strong>, promoting open science and enabling better clinical tools through more accurate and generalizable models.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
