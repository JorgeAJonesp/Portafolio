import { ExternalLink, Github } from "lucide-react"
import { getImagePath } from "@/lib/path-utils"

const projects = [
  {
    title: "SaaS Analytics Platform",
    description:
      "Plataforma completa de analytics con dashboards en tiempo real, procesamiento de millones de eventos diarios y visualizaciones interactivas.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Vercel"],
    image: "/modern-analytics-dashboard-dark-theme.png",
    github: "#",
    live: "#",
  },
  {
    title: "E-commerce Marketplace",
    description:
      "Marketplace multi-vendor con sistema de pagos, gestión de inventario, chat en tiempo real y panel de administración completo.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
    image: "/ecommerce-marketplace-interface-dark.jpg",
    github: "#",
    live: "#",
  },
  {
    title: "API Gateway & Microservices",
    description:
      "Arquitectura de microservicios con API Gateway, autenticación JWT, rate limiting y documentación automática con Swagger.",
    tech: ["Node.js", "Express", "Docker", "Kubernetes", "AWS"],
    image: "/api-architecture-diagram-dark-theme.jpg",
    github: "#",
    live: "#",
  },
  {
    title: "Real-time Collaboration Tool",
    description:
      "Herramienta de colaboración en tiempo real estilo Figma/Miro con cursores compartidos, comentarios y sincronización instantánea.",
    tech: ["Next.js", "WebSockets", "Supabase", "Tailwind", "Framer Motion"],
    image: "/collaboration-tool-interface-dark.jpg",
    github: "#",
    live: "#",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 text-balance">Proyectos destacados</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-video bg-black/20">
                <img
                  src={getImagePath(project.image || "placeholder.svg")}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.github}
                    className="w-10 h-10 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    aria-label="View code"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.live}
                    className="w-10 h-10 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-white transition-colors">{project.title}</h3>

                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
