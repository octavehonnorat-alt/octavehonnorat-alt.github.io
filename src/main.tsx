import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from '@studio-freight/lenis'
import App from './App'
import './index.css'

export function Root() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.07,
      smoothWheel: true,
    })

    let frameId: number
    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
