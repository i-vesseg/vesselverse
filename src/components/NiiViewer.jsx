// src/NiiViewer.jsx
import React, { useEffect, useRef, useState } from 'react'
import { Niivue } from '@niivue/niivue'

// Utility per aggiungere BASE_URL ai path locali
function withBase(p) {
  if (!p) return p
  if (/^https?:\/\//i.test(p)) return p // se è già un URL assoluto, non toccarlo
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${p.replace(/^\//, '')}`
}

const NiiViewer = ({ niftiPath }) => {
  const canvasRef = useRef(null)
  const nvRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    const loadImage = async () => {
      try {
        if (!canvasRef.current) return

        // Cleanup previous instance
        if (nvRef.current) {
          try {
            nvRef.current.closeAllVolumes()
          } catch (e) {
            console.warn('Cleanup warning:', e)
          }
        }

        const nv = new Niivue({
          show3Dcrosshair: true,
          backColor: [0, 0, 0, 1],
          dragMode: 'contrast',
        })
        nvRef.current = nv

        await nv.attachToCanvas(canvasRef.current)

        const resizeCanvas = () => {
          const canvas = canvasRef.current
          if (canvas && canvas.parentElement && mounted) {
            canvas.width = canvas.parentElement.clientWidth
            canvas.height = canvas.parentElement.clientHeight
            nv.drawScene()
          }
        }

        // Initial resize with delay for mobile
        setTimeout(resizeCanvas, 100)
        window.addEventListener('resize', resizeCanvas)

        const url = withBase(niftiPath)
        await nv.loadVolumes([{ url }])

        if (mounted) {
          setLoading(false)
          setError(null)
          // Force redraw after load
          setTimeout(resizeCanvas, 200)
        }

        return () => {
          window.removeEventListener('resize', resizeCanvas)
        }
      } catch (err) {
        console.error('NiiViewer load error:', err)
        if (mounted) {
          setError(err.message || 'Failed to load image')
          setLoading(false)
          
          // Auto retry once on mobile
          if (retryCount < 1 && window.innerWidth <= 600) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1)
            }, 1000)
          }
        }
      }
    }

    loadImage()

    return () => {
      mounted = false
      if (nvRef.current) {
        try {
          nvRef.current.closeAllVolumes()
        } catch (e) {
          console.warn('Cleanup warning:', e)
        }
      }
    }
  }, [niftiPath, retryCount])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          fontSize: '1.2rem',
          zIndex: 10
        }}>
          Loading...
        </div>
      )}
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#ff6b6b',
          fontSize: '1rem',
          textAlign: 'center',
          padding: '1rem',
          zIndex: 10
        }}>
          <div>Failed to load image</div>
          <button
            onClick={() => {
              setRetryCount(prev => prev + 1)
              setError(null)
            }}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#e73370',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: loading ? 0.3 : 1,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  )
}

export default NiiViewer
