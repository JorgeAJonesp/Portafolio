"use client"

import { Code2, Database, Rocket } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono tracking-wider uppercase">
                Sobre mí
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Construyendo el futuro, <span className="text-muted-foreground">una línea de código a la vez</span>
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Soy un ingeniero fullstack apasionado por crear experiencias digitales excepcionales. Me especializo en
                arquitecturas escalables y soluciones end-to-end que resuelven problemas reales.
              </p>
              <p>
                Con experiencia en integraciones SaaS complejas y desarrollo de APIs robustas, transformo ideas en
                productos que impactan. Mi enfoque combina código limpio, mejores prácticas y una obsesión por los
                detalles.
              </p>
              <p>
                Cuando no estoy programando, me encontrarás explorando nuevas tecnologías, contribuyendo a proyectos
                open source o compartiendo conocimiento con la comunidad dev.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "Express", "tRPC", "Prisma", "PostgreSQL", "MongoDB"].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">DevOps & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Docker", "Vercel", "AWS", "GitHub Actions", "Supabase"].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
