'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import './logo-loop.css'

type LogoItem = { src: string; alt: string }

type LogoLoopProps = {
  logos: LogoItem[]
  speed?: number
  logoHeight?: number
  gap?: number
  ariaLabel?: string
}

export function LogoLoop({ logos, speed = 70, logoHeight = 160, gap = 24, ariaLabel = 'Pastéis disponíveis' }: LogoLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const sequence = useMemo(() => [...logos, ...logos], [logos])

  useEffect(() => {
    let frame = 0
    let last = performance.now()
    const animate = (time: number) => {
      const delta = (time - last) / 1000
      last = time
      setOffset((current) => current + speed * delta)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [speed])

  return (
    <div className="logo-loop" aria-label={ariaLabel} role="region">
      <div ref={trackRef} className="logo-loop__track" style={{ gap, transform: `translate3d(-${offset % (logos.length * (logoHeight + gap))}px, 0, 0)` }}>
        {sequence.map((logo, index) => (
          <div className="logo-loop__item" key={`${logo.src}-${index}`} style={{ width: logoHeight * 1.4, height: logoHeight }}>
            <img src={logo.src} alt={logo.alt} width={logoHeight * 1.4} height={logoHeight} loading={index < logos.length ? 'eager' : 'lazy'} decoding="async" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoLoop
