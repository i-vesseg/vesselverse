import { useState, useRef } from "react";

export default function VesselAnimation() {
  const [sliderValue, setSliderValue] = useState(50);
  const containerRef = useRef(null);
  const handleRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newValue = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderValue(Math.min(100, Math.max(0, newValue)));
  };

  return (
    <div
      ref={containerRef}
      className="vessel-animation-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
        cursor: "ew-resize"
      }}
      onMouseMove={handleMouseMove}
    >
      <img
        src="/brain_xray_before.png"
        alt="Brain X-ray Before"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
          pointerEvents: "none"
        }}
      >
        <img
          src="/brain_xray_after.png"
          alt="Brain X-ray After"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none"
          }}
        />
      </div>
      <div
        ref={handleRef}
        className="slider-handle"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "4px",
          background: "red",
          left: `${sliderValue}%`,
          transform: "translateX(-50%)",
          pointerEvents: "auto",
          cursor: "ew-resize"
        }}
      />
    </div>
  );
}
