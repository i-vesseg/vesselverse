// src/VerticalTimeline.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./VerticalTimeline.css";

// Utility per path con base
function withBase(p) {
  if (!p) return p;
  if (/^https?:\/\//i.test(p)) return p;
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${p.replace(/^\//, "")}`;
}

function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState("down");
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY > lastScrollY) setScrollDir("down");
      else if (currentScrollY < lastScrollY) setScrollDir("up");
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollDir;
}

const steps = [
  {
    id: "annotations",
    title: "Annotation Sources",
    description: `<strong>Annotations in VesselVerse</strong> come from a diverse set of sources including <strong>human experts</strong> and <strong>AI models</strong>. Each image can be annotated multiple times, reflecting different <strong>labeling protocols</strong> and <strong>expertise levels</strong>. This enables broader representation and more robust learning, while treating both <strong>manual and model-based outputs as expert-level annotations</strong>.`,
    image: "/overview/overview1.png",
  },
  {
    id: "staple",
    title: "Consensus Generation (STAPLE)",
    description: `VesselVerse uses a <strong>STAPLE-based consensus algorithm</strong> to combine multiple annotations into one probabilistic reference mask. This approach automatically <strong>weighs and integrates annotations</strong> based on their estimated accuracy, helping <strong>resolve disagreements</strong> and offering a <strong>reliable standard</strong> for evaluation and training.`,
    image: "/overview/overview2.png",
  },
  {
    id: "refinement",
    title: "Human Refinement & New Annotations",
    description: `After consensus generation, <strong>experts can contribute new annotations or refine existing ones</strong>. This step ensures annotations reflect <strong>high-quality domain knowledge</strong>, allows <strong>error correction</strong>, and supports <strong>continuous dataset evolution</strong> through collaborative updates.`,
    image: "/overview/overview3.png",
  },
  {
    id: "database",
    title: "VesselVerse Database",
    description: `<strong>All annotations and refinements</strong> are versioned and stored in a centralized repository. The database supports <strong>multi-expert annotations</strong>, <strong>consensus masks</strong>, and <strong>incremental updates</strong>, ensuring traceability and reproducibility across the annotation lifecycle.`,
    image: "/overview/overview4.png",
  },
  {
    id: "validation",
    title: "Validation & Manual Correction",
    description: `Before being finalized, <strong>annotations undergo strict validation</strong>. Experts or validators <strong>manually review the data</strong>, ensuring <strong>spatial consistency</strong>, <strong>accuracy</strong>, and <strong>metadata integrity</strong>. If errors are found, they are corrected, and each change is <strong>tracked through VesselVerse’s built-in version control system</strong>.`,
    image: "/overview/overview5.png",
  },
];

export default function VerticalTimeline() {
  const scrollDirection = useScrollDirection();
  const animationVariant =
    scrollDirection === "down"
      ? { hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1 } }
      : { hidden: { y: -100, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  const stepsWithBase = steps.map(s => ({ ...s, image: withBase(s.image) }));

  return (
    <div className="vertical-timeline-container">
      <div className="vertical-line"></div>
      {stepsWithBase.map((step) => (
        <div className="timeline-step" key={step.id}>
          <div className="step-circle"></div>
          <motion.div
            className="step-content"
            variants={animationVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}  
            transition={{ duration: 0.6 }}
          >
            <div className="text-block">
              <h2 className="step-title">{step.title}</h2>
              <p
                className="step-description"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
            <div className="image-block">
              <img src={step.image} alt={step.title} className="step-image" />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
