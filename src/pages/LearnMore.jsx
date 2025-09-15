import React, { useState } from "react";
import VerticalTimeline from "../components/VerticalTimeline";
import "./LearnMore.css";
import ScrollToHash from "../components/ScrollToHash"; 

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? "faq-item sel" : "faq-item"}>
      <ScrollToHash/>
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <h3>{question}</h3>
        <span className="toggle">{open ? '-' : '+'}</span>
      </div>
      {open && (
        <div className="faq-answer">
          <p dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      )}
    </div>
  );
}

function LearnMore() {
  const faqData = [
    {
      question: "Can I contribute to the dataset?",
      answer:
        "Yes. VesselVerse is designed to support <strong>community-driven collaboration</strong>. You can contribute by <strong>adding new annotations</strong>, <strong>refining existing ones</strong>, or <strong>reporting errors</strong>. All contributions are versioned, validated, and integrated into the dataset using the <strong>built-in version control system</strong>."
    },
    {
      question: "What makes VesselVerse different from other medical imaging datasets?",
      answer:
        "Unlike static datasets, VesselVerse is a dynamic and collaborative framework that supports <strong>multi-expert annotations</strong>, <strong>STAPLE-based consensus generation</strong>, and <strong>version control</strong>. This allows for continuous improvement of annotations and ensures full traceability of changes over time."
    },
    {
      question: "Are model-generated segmentations treated the same as manual annotations?",
      answer:
        "Yes. VesselVerse embraces an inclusive approach by treating <strong>AI-generated segmentations as expert-level annotations</strong>. This reflects the framework’s commitment to scalability and acknowledges the evolving role of machine learning in medical image interpretation."
    },
    {
      question: "How is annotation quality ensured within VesselVerse?",
      answer:
        "Annotation quality is maintained through a combination of <strong>expert validation</strong>, <strong>consensus generation using the STAPLE algorithm</strong>, and a robust <strong>version control system</strong> that tracks all modifications. This ensures that annotations are accurate, consistent, and transparently auditable."
    },
  ];

  const base = import.meta.env.BASE_URL;
  
  return (
    <div>
      <section className="title">
        <div className="hero-content-learn">
          <h1>Overview of the VesselVerse dataset and framework architecture</h1>
        </div>
      </section>

      <section className="info-section-learn">
        <VerticalTimeline />
      </section>

      <section className="tutorial-video" id="tutorial-video" style={{ paddingTop: '2em' }}>
        <div className="hero-content">
          <h1 style={{ paddingBottom: '1em' }}>Tutorial: How to use VesselVerse on 3DSlicer</h1>
          <div className="video-container">
            <video 
              src={`${base}/DEMO_VESSELVERSE.mp4`} 
              controls
              title="Tutorial VesselVerse su 3DSlicer">
            </video>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFE8E8', padding: '1em' }}>
        <div className="FAQ">
          <h2>FAQ</h2>
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default LearnMore;
