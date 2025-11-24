import React, { useState } from "react";

const pillarsData = [
  {
    key: "annotations",
    label: "Annotations",
    paragraphs: [
      "The first core pillar is <strong>Expert Annotations</strong>. VesselVerse supports <strong>multiple annotations per image</strong>, which can originate from various sources including <strong>manual expert labeling</strong>, <strong>AI-driven models</strong>, and <strong>algorithmic methods</strong> like the Frangi filter. This inclusive approach captures different annotation styles and protocols, such as variations in labeling veins versus arteries or defining vessel boundaries. Notably, <strong>model-generated outputs are treated as expert-level annotations</strong>, enabling scalable dataset expansion while embracing the evolving role of AI in medical imaging."
    ]
  },
  {
    key: "consensus",
    label: "Consensus",
    paragraphs: [
      "The second pillar is <strong>Consensus Generation</strong>. To reconcile differing annotations, VesselVerse uses the <strong>STAPLE algorithm</strong>, a probabilistic method that fuses multiple annotations into a single, unified result. It estimates the <strong>sensitivity and specificity</strong> of each input and produces a consensus segmentation by weighting each annotation accordingly. This helps resolve disagreements between experts or models and provides a <strong>high-confidence reference mask</strong> that reflects collective input while minimizing individual bias."
    ]
  },
  {
    key: "versionControl",
    label: "Version control",
    paragraphs: [
      "The third pillar is <strong>Version Control</strong>. VesselVerse integrates a robust version tracking system that allows users to <strong>refine annotations collaboratively</strong>, track changes over time, and even <strong>revert to previous versions</strong> if needed. Every update is subjected to <strong>validation checks</strong> for spatial consistency, metadata completeness, and quality standards before being committed. This ensures that the dataset remains reliable and transparent, and it allows for continuous improvement without compromising annotation integrity."
    ]
  }
];

export default function Pillars() {
  const [selectedDesktop, setSelectedDesktop] = useState("annotations");
  const [openAccordion, setOpenAccordion] = useState(["annotations"]);

  const activePillarDesktop = pillarsData.find(
    (p) => p.key === selectedDesktop
  );

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  return (
    <section className="pillars-section no-pointer" id="pillars">
      <h2 className="pillars-title">The 3 pillars of the framework</h2>

      {/* LAYOUT DESKTOP/TABLET */}
      <div className="desktop-pillars" >
        <div className="pillar-row">
          {pillarsData.map((pillar) => {
            const isActive = pillar.key === selectedDesktop;
            return (
              <div className="col" key={pillar.key}>
                <div
                  className={`pillar clickable ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedDesktop(pillar.key)}
                >
                  <h3>{pillar.label}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pillar-text">
          {activePillarDesktop?.paragraphs.map((paragraph, idx) => (
            <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </div>

      {/* LAYOUT MOBILE (ACCORDION) */}
      <div className="mobile-pillars">
        {pillarsData.map((pillar) => {
          const isOpen = openAccordion.includes(pillar.key);
          return (
            <div className="accordion-item clickable" key={pillar.key}>
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(pillar.key)}
              >
                <h3>{pillar.label}</h3>
                <span>{isOpen ? "▲" : "▼"}</span>
              </div>
              {isOpen && (
                <div className="accordion-content">
                  {pillar.paragraphs.map((paragraph, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
