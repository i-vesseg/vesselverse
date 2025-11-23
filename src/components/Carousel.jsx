import React, { useEffect, useRef, useState } from 'react'
import './Carousel.css'

export default function Carousel({ items = [], interval = 6000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)

  useEffect(() => {
    if (!interval || paused || items.length <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(t)
  }, [interval, paused, items.length])

  const go = (i) => setIndex((i + items.length) % items.length)

  return (
    <div
      className="vv-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          ref={trackRef}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((it, i) => (
            <div className="carousel-slide" key={i}>
              {it.type === 'video' ? (
                <video controls className="carousel-video" src={it.src} title={it.title} />
              ) : (
                <iframe
                  className="carousel-iframe"
                  src={it.src}
                  title={it.title}
                  frameBorder="0"
                  allowFullScreen
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn prev" onClick={() => go(index - 1)} aria-label="Previous">
        ‹
      </button>
      <button className="carousel-btn next" onClick={() => go(index + 1)} aria-label="Next">
        ›
      </button>

      <div className="carousel-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
