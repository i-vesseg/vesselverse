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
    let resizeListener = null
    setLoading(true)
    setError(null)

    // Timeout to prevent infinite loading state
    const loadingTimeout = setTimeout(() => {
      if (mounted && loading) {
        setError('Loading timeout - image may be too large')
        setLoading(false)
      }
    }, 15000) // 15 second timeout

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
          loadingText: 'Loading medical image...',
        })
        nvRef.current = nv

        await nv.attachToCanvas(canvasRef.current)

        const resizeCanvas = () => {
          const canvas = canvasRef.current
          if (canvas && canvas.parentElement && mounted) {
            const parent = canvas.parentElement
            const width = parent.clientWidth
            const height = parent.clientHeight
            
            if (width > 0 && height > 0) {
              canvas.width = width
              canvas.height = height
              try {
                nv.drawScene()
              } catch (e) {
                console.warn('Draw scene error:', e)
              }
            }
          }
        }

        // Initial resize with delay for mobile
        setTimeout(resizeCanvas, 150)
        
        resizeListener = resizeCanvas
        window.addEventListener('resize', resizeListener)

        const url = withBase(niftiPath)
        console.log('Loading NIfTI from:', url)
        
        await nv.loadVolumes([{ url }])

        if (mounted) {
          clearTimeout(loadingTimeout)
          setLoading(false)
          setError(null)
          // Force multiple redraws for mobile
          setTimeout(resizeCanvas, 100)
          setTimeout(resizeCanvas, 300)
          setTimeout(resizeCanvas, 500)
        }
      } catch (err) {
        console.error('NiiViewer load error:', err)
        if (mounted) {
          clearTimeout(loadingTimeout)
          setError(err.message || 'Failed to load image')
          setLoading(false)
          
          // Auto retry twice on mobile
          if (retryCount < 2 && window.innerWidth <= 600) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1)
            }, 1500)
          }
        }
      }
    }

    loadImage()

    return () => {
      mounted = false
      clearTimeout(loadingTimeout)
      if (resizeListener) {
        window.removeEventListener('resize', resizeListener)
      }
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
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#e73370',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(231, 51, 112, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
