import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Senior Fullstack Engineer",
    company: "Tech Innovators Inc.",
    period: "2022 - Presente",
    description:
      "Liderando el desarrollo de plataformas SaaS escalables con Next.js y Node.js. Implementación de arquitecturas serverless y microservicios.",
    achievements: [
      "Reduje el tiempo de carga en 60% optimizando el bundle",
      "Implementé CI/CD reduciendo deploys de 2h a 10min",
      "Lideré equipo de 5 desarrolladores en proyecto crítico",
    ],
  },
  {
    title: "Fullstack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description:
      "Desarrollo de aplicaciones web complejas y APIs RESTful. Integración con servicios de terceros y optimización de rendimiento.",
    achievements: [
      "Desarrollé sistema de autenticación multi-tenant",
      "Integré 15+ APIs de terceros (Stripe, Twilio, SendGrid)",
      "Mejoré SEO resultando en 200% más tráfico orgánico",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Creative Agency",
    period: "2018 - 2020",
    description:
      "Creación de interfaces modernas y responsivas. Colaboración estrecha con diseñadores para pixel-perfect implementations.",
    achievements: [
      "Construí 30+ landing pages de alta conversión",
      "Implementé design system usado por 10+ proyectos",
      "Reduje bugs en producción en 40% con testing",
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono tracking-wider uppercase">
            Trayectoria
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 text-balance">Experiencia que cuenta</h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative pl-8 border-l-2 border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-background group-hover:scale-125 transition-transform duration-300" />

              <div className="space-y-4 pb-2">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-white transition-colors">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono text-sm">{exp.period}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <span className="text-white/40 group-hover/item:text-white/80 mt-1 transition-colors">▸</span>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
