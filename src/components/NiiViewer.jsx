// src/NiiViewer.jsx
import React, { useEffect, useRef } from 'react'
import { Niivue } from '@niivue/niivue'

function withBase(p) {
  if (!p) return p
  if (/^https?:\/\//i.test(p)) return p
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${p.replace(/^\//, '')}`
}

const NiiViewer = ({ niftiPath }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const nv = new Niivue({
      show3Dcrosshair: true,
      backColor: [0, 0, 0, 1],
      dragMode: 'contrast',
    })

    nv.attachToCanvas(canvasRef.current)

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight
        nv.drawScene()
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    nv.loadVolumes([
      {
        url: withBase(niftiPath),
        volume: { hdr: null, img: null },
      },
    ])

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [niftiPath])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  )
}

export default NiiViewer
