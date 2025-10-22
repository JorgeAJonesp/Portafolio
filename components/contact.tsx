"use client";

import type React from "react";
import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import { DiscordLogoIcon } from "@radix-ui/react-icons"; // Alternativa con Radix
// O si prefieres mantener lucide-react, usa:
// import { MessageCircle } from "lucide-react" // Similar a Discord
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono tracking-wider uppercase">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 text-balance max-w-2xl mx-auto">
            Hablemos de tu próximo proyecto
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
            Siempre estoy abierto a discutir nuevos proyectos, ideas creativas o
            oportunidades para ser parte de tu visión.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <a
              href="mailto:jorgealfredo_jones@hotmail.com"
              className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Email</div>
                <div className="font-mono text-sm">
                  jorgealfredo_jones@hotmail.com
                </div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/jorgeajones"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">
                  LinkedIn
                </div>
                <div className="font-mono text-sm">
                  www.linkedin.com/in/jorgeajones
                </div>
              </div>
            </a>

            <a
              href="https://github.com/JorgeAJonesp"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Github className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">GitHub</div>
                <div className="font-mono text-sm">
                  https://github.com/JorgeAJonesp
                </div>
              </div>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <DiscordLogoIcon className="w-5 h-5" />
                {/* O usar: <MessageCircle className="w-5 h-5" /> */}
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">
                  Discord
                </div>
                <div className="font-mono text-sm">JorgeJones#0200</div>
              </div>
            </a>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Nombre
                </label>
                <Input
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-white/5 border-white/10 focus:border-white/20"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-white/5 border-white/10 focus:border-white/20"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Mensaje
                </label>
                <Textarea
                  placeholder="Cuéntame sobre tu proyecto..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className="bg-white/5 border-white/10 focus:border-white/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90 font-semibold"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar mensaje
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            {"</>"} Hecho con dedicación por Alfredo Jones ·{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
