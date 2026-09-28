'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const fallbackAssets = [
  '/pastel-boer-logo.png',
  '/pastel-boer-hero.png',
  '/pastel-boer-flavors.png',
]

export function SitePreloader() {
  const [ready, setReady] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const logo = logoRef.current
    const progress = progressRef.current
    if (!root || !logo || !progress) return

    const imageSources = Array.from(new Set([
      ...fallbackAssets,
      ...Array.from(document.images).map((image) => image.currentSrc || image.src),
    ]))
    let loaded = 0
    let finished = false
    let finishTimeout: number | undefined
    const minimumVisibleTime = 1600
    const startedAt = performance.now()

    const finishLoader = () => {
      if (finished) return
      finished = true
      gsap.timeline({ onComplete: () => { setReady(true) } })
        .to(logo, { scale: 1.06, duration: 0.55, ease: 'back.out(1.7)' })
        .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power4.inOut' })
    }

    const updateProgress = () => {
      loaded += 1
      const ratio = Math.min(loaded / imageSources.length, 1)
      gsap.to(progress, { width: `${Math.round(ratio * 100)}%`, duration: 0.22, ease: 'power2.out' })
      if (ratio === 1 && !finished) {
        const remainingTime = Math.max(0, minimumVisibleTime - (performance.now() - startedAt))
        finishTimeout = window.setTimeout(finishLoader, remainingTime)
      }
    }

    gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    gsap.fromTo(logo, { y: 18, scale: 0.88, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.8, delay: 0.15, ease: 'back.out(1.6)' })

    imageSources.forEach((source) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = updateProgress
      image.onerror = updateProgress
      image.src = source
      if (image.complete) updateProgress()
    })

    const minimum = window.setTimeout(() => {
      if (!finished && imageSources.length === 0) updateProgress()
    }, 900)

    return () => {
      window.clearTimeout(minimum)
      if (finishTimeout) window.clearTimeout(finishTimeout)
    }
  }, [])

  if (ready) return null

  return (
    <div ref={rootRef} className="site-preloader" role="status" aria-live="polite" aria-label="Carregando o cardápio">
      <div className="site-preloader-inner">
        <img ref={logoRef} src="/pastel-boer-logo.png" alt="Pastel Boer" className="site-preloader-logo" />
        <p className="site-preloader-kicker">Carregando sua página</p>
        <div className="site-preloader-track" aria-hidden="true"><span ref={progressRef} /></div>
        <p className="site-preloader-percent">Bom apetite! <span>•</span></p>
      </div>
    </div>
  )
}
