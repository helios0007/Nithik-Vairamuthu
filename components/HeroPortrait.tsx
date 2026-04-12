'use client'

import { useState, useRef, useEffect } from 'react'

export default function HeroPortrait() {
  const [transform, setTransform] = useState(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  )
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play once on load, stop at final frame
 useEffect(() => {
  const video = videoRef.current
  if (!video) return

  // handle the promise — browser may block autoplay
  const playPromise = video.play()
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // browser blocked it — silently ignore, hover will still work
    })
  }

  const handleEnded = () => {
    video.pause()
  }

  video.addEventListener('ended', handleEnded)
  return () => video.removeEventListener('ended', handleEnded)
}, [])

  // Mouse tilt
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 8
    const rotateX = ((centerY - y) / centerY) * 8
    setTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    )
  }

  function handleMouseLeave() {
    setTransform(
      'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    )
    // pause when pointer leaves
    videoRef.current?.pause()
  }

function handleMouseEnter() {
  const video = videoRef.current
  if (!video) return
  const playPromise = video.play()
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // silently ignore if browser blocks it
    })
  }
}
  return (
    <div className="portrait-wrap">
      <div className="portrait-glow" />
      <div className="portrait-grid" />

      <div
        className="portrait-card portrait-card-interactive"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            minHeight: '420px',
            objectFit: 'cover',
            borderRadius: '28px',
          }}
        >
          <source src="/hero-animation.webm" type="video/webm" />
          <source src="/hero-animation.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}