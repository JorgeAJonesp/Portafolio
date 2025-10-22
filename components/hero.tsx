"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import { SpotifyNowPlaying } from "./spotify-now-playing"
import { getImagePath } from "@/lib/path-utils"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const keywords = [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "API",
      "REST",
      "GraphQL",
      "SaaS",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Vercel",
      "Git",
      "CI/CD",
      "Microservices",
      "Redux",
      "Tailwind",
      "Express",
      "Prisma",
      "tRPC",
      "Zod",
      "React Query",
      "Zustand",
    ]

    const colors = [
      "rgba(168, 85, 247, 0.3)", // púrpura
      "rgba(59, 130, 246, 0.3)", // azul
      "rgba(34, 211, 238, 0.3)", // cyan
      "rgba(139, 92, 246, 0.3)", // violeta
      "rgba(96, 165, 250, 0.3)", // azul claro
    ]

    const typingWords: Array<{
      x: number
      y: number
      text: string
      fullText: string
      currentIndex: number
      opacity: number
      phase: "typing" | "visible" | "fading"
      size: number
      framesSinceLastChar: number
      visibleTime: number
      color: string
    }> = []

    function createNewWord() {
      if (!canvas) return
      
      const fullText = keywords[Math.floor(Math.random() * keywords.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]
      typingWords.push({
        x: Math.random() * (canvas.width - 200) + 50,
        y: Math.random() * (canvas.height - 100) + 50,
        text: "",
        fullText,
        currentIndex: 0,
        opacity: 1,
        phase: "typing",
        size: Math.random() * 4 + 14,
        framesSinceLastChar: 0,
        visibleTime: 0,
        color,
      })
    }

    for (let i = 0; i < 6; i++) {
      setTimeout(() => createNewWord(), i * 600)
    }

    let frameCount = 0

    function animate() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(24, 24, 40, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      frameCount++

      if (frameCount % 100 === 0 && typingWords.length < 10) {
        createNewWord()
      }

      typingWords.forEach((word, index) => {
        ctx.font = `${word.size}px 'JetBrains Mono', monospace`

        if (word.phase === "typing") {
          word.framesSinceLastChar++

          if (word.framesSinceLastChar >= 8) {
            word.framesSinceLastChar = 0
            word.currentIndex++
            word.text = word.fullText.substring(0, word.currentIndex)

            if (word.currentIndex >= word.fullText.length) {
              word.phase = "visible"
            }
          }

          const showCursor = Math.floor(frameCount / 15) % 2 === 0
          ctx.fillStyle = word.color
          ctx.fillText(word.text + (showCursor ? "|" : ""), word.x, word.y)
        } else if (word.phase === "visible") {
          word.visibleTime++
          ctx.fillStyle = word.color
          ctx.fillText(word.text, word.x, word.y)

          if (word.visibleTime > 150) {
            word.phase = "fading"
          }
        } else if (word.phase === "fading") {
          word.opacity -= 0.008
          const colorWithOpacity = word.color.replace(/[\d.]+\)$/, `${word.opacity})`)
          ctx.fillStyle = colorWithOpacity
          ctx.fillText(word.text, word.x, word.y)

          if (word.opacity <= 0) {
            typingWords.splice(index, 1)
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-2xl blur-3xl animate-pulse" />

              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20">
                  {/* Usando img normal para mayor compatibilidad con GitHub Pages */}
                  <img
                    src={getImagePath("Yo.jpg")}
                    alt="Jorge Alfredo Jones Spindola"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover grayscale contrast-125"
                    loading="eager"
                    onError={(e) => {
                      // Evitar loop infinito 
                      if (!e.currentTarget.dataset.fallbackAttempted) {
                        e.currentTarget.dataset.fallbackAttempted = 'true';
                        console.log('Trying fallback image...', getImagePath("placeholder-user.jpg"));
                        e.currentTarget.src = getImagePath("placeholder-user.jpg");
                      }
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 font-mono text-xs text-primary space-y-1">
                      <div className="animate-pulse">{"> fullstack_engineer.init()"}</div>
                      <div className="animate-pulse delay-100">{"> loading_skills..."}</div>
                      <div className="animate-pulse delay-200">{"> status: listo_para_construir"}</div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/50 translate-x-1 translate-y-1 transition-all duration-300 pointer-events-none" />

                <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/50 -translate-x-1 -translate-y-1 transition-all duration-300 pointer-events-none" />
              </div>

              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-accent/60" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-accent/60" />
            </div>

            {/* Spotify Now Playing - Agregado debajo de la foto */}
            <div className="mt-6">
              <SpotifyNowPlaying />
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-mono tracking-wider uppercase text-primary">
                  Fullstack Engineer
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-none">
                <span className="block">Jorge Alfredo</span>
                <span className="block mt-2">Jones Spindola</span>
              </h1>

              <div className="h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Construyo soluciones escalables end-to-end con{" "}
                <span className="text-primary font-semibold">Next.js</span>,{" "}
                <span className="text-secondary font-semibold">React</span> y{" "}
                <span className="text-accent font-semibold">TypeScript</span>. Especializado en integraciones SaaS y
                arquitecturas robustas.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Node.js", "APIs", "SaaS"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 rounded-lg text-sm font-mono transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Contactar
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 rounded-lg font-semibold transition-all duration-300"
              >
                Ver Proyectos
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  )
}
