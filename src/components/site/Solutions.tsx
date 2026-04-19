import { motion } from "framer-motion";
import { SectionTitle } from "./Reveal";
import { ScrollReveal } from "./ScrollAnimation";

const INDUSTRIES = [
  { name: "Financial Services", color: "cyan",
    cases: ["Fraud detection", "Collections automation", "KYC & compliance bots", "Wealth advisor copilots"],
    gradient: "from-cyan/40 via-accent/20 to-transparent",
  },
  { name: "eCommerce", color: "violet",
    cases: ["Cart recovery", "Support automation", "Delivery alerts", "Personalized upsell"],
    gradient: "from-accent/40 via-destructive/20 to-transparent",
  },
  { name: "Healthcare", color: "cyan",
    cases: ["Patient engagement", "Appointment bots", "HIPAA-ready voice", "Clinical summaries"],
    gradient: "from-cyan/50 via-cyan/10 to-transparent",
  },
  { name: "Logistics", color: "coral",
    cases: ["Shipment tracking", "Driver coordination", "ETA alerts", "Yard management"],
    gradient: "from-destructive/40 via-cyan/20 to-transparent",
  },
  { name: "Education", color: "violet",
    cases: ["Student onboarding", "AI tutors", "Attendance systems", "Multilingual outreach"],
    gradient: "from-accent/50 via-cyan/20 to-transparent",
  },
  { name: "Startups", color: "coral",
    cases: ["Affordable APIs", "Fast onboarding", "Scale-as-you-grow", "Founder copilots"],
    gradient: "from-cyan/40 via-accent/20 to-destructive/20",
  },
];

const COLOR_MAP: Record<string, string> = {
  cyan: "rgba(0, 245, 255, 0.8)",
  violet: "rgba(123, 47, 255, 0.8)",
  coral: "rgba(255, 107, 107, 0.8)",
};

export function Solutions() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan/5 blur-3xl animate-pulse-glow" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Solutions"
          title={<>Built for <span className="text-gradient">Your World</span></>}
          subtitle="Tailored playbooks for every industry. Drop-in fast, scale boldly."
        />

        <div className="mt-16 -mx-6 px-6 overflow-x-auto pb-8">
          <div className="flex gap-6 min-w-max">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.08}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    delay: i * 0.05,
                    duration: 0.5,
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                  }}
                  className="group relative w-[320px] sm:w-[360px] h-[440px] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-60" style={{ background: `linear-gradient(135deg, ${COLOR_MAP[ind.color]}20 0%, transparent 50%, ${COLOR_MAP[ind.color]}10 100%)` }} />
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${ind.gradient}`} />
                  
                  <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30 transition-transform duration-700 group-hover:scale-150" style={{ background: COLOR_MAP[ind.color] }} />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl opacity-20 transition-transform duration-500 group-hover:scale-125" style={{ background: COLOR_MAP[ind.color] }} />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  <div className="absolute top-0 left-0 w-full h-px">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${COLOR_MAP[ind.color]}, transparent)` }} />
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 rounded-full border border-dashed border-cyan/20"
                    />
                  </div>

                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <motion.div 
                      className="text-xs font-mono text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 + 0.2 }}
                    >
                      /{String(i + 1).padStart(2, "0")}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <h3 className="font-display text-2xl font-extrabold">{ind.name}</h3>
                      
                      <div className="overflow-hidden mt-4">
                        <ul className="space-y-2 text-sm text-foreground/80">
                          {ind.cases.map((c, j) => (
                            <motion.li 
                              key={c}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 + 0.15 + j * 0.05 }}
                              className="flex items-center gap-2"
                            >
                              <motion.span 
                                whileHover={{ scale: 1.5 }}
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: COLOR_MAP[ind.color] }}
                              />
                              {c}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.3 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent" />
                      <span>Explore</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
</ScrollReveal>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}