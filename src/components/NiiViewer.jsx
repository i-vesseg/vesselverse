// src/NiiViewer.jsx
import React, { useEffect, useRef } from 'react'
import { Niivue } from '@niivue/niivue'

const NiiViewer = ({ niftiPath }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const nv = new Niivue({
      show3Dcrosshair: true,
      backColor: [0, 0, 0, 1],
      dragMode: 'contrast',
    })

    nv.attachToCanvas(canvasRef.current)

    // Resize canvas to fit container
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
        url: niftiPath,
        volume: { hdr: null, img: null },
      },
    ])

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [niftiPath])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '800',
          height: '800',
          display: 'block'
        }}
      />
    </div>
  )
}

export default NiiViewer
