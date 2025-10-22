"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail } from "lucide-react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold font-mono">
            {"<AJ />"}
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm hover:text-accent transition-colors">
              Acerca de
            </a>
            <a href="#experience" className="text-sm hover:text-accent transition-colors">
              Experiencia
            </a>
            <a href="#projects" className="text-sm hover:text-accent transition-colors">
              Proyectos
            </a>
            <a href="#contact" className="text-sm hover:text-accent transition-colors">
              Contacto
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/JorgeAJonesp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="Perfil de GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jorgeajones"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="Perfil de LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:jorgealfredo_jones@hotmail.com" className="hover:text-accent transition-colors" aria-label="Enviar correo electrónico">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
