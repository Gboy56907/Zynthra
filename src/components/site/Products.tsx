import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Mic, MessageSquare, Brain, Headphones, Languages,
  Phone, Network, Radio, MessageCircle, Video, Workflow,
  Layers, Wand2, Cpu, Server, Lock, GitBranch,
  Code2, Smartphone, BoxSelect, FileText, Rss, FlaskConical,
  ArrowRight,
} from "lucide-react";
import { HolographicCard } from "./HolographicCard";
import { SectionTitle } from "./Reveal";
import { ScrollReveal } from "./ScrollAnimation";
import { cn } from "@/lib/utils";

type Product = { name: string; desc: string; icon: typeof Bot };
const TABS: { id: string; label: string; products: Product[] }[] = [
  { id: "ai", label: "AI Intelligence", products: [
    { name: "NexaAgent", desc: "Autonomous AI agents for enterprise workflows", icon: Bot },
    { name: "NexaVoice", desc: "GenAI-powered voice bot with real-time speech", icon: Mic },
    { name: "NexaChat", desc: "Intelligent chat agents with context memory", icon: MessageSquare },
    { name: "NexaMind", desc: "Conversation intelligence & quality analysis", icon: Brain },
    { name: "NexaAssist", desc: "Real-time agent guidance & coaching", icon: Headphones },
    { name: "NexaLingo", desc: "Multilingual AI translation engine", icon: Languages },
  ]},
  { id: "comms", label: "Communications", products: [
    { name: "NexaCall", desc: "Cloud telephony & smart IVR", icon: Phone },
    { name: "NexaTrunk", desc: "Dynamic SIP trunking at scale", icon: Network },
    { name: "NexaStream", desc: "Voice streaming for bots & agents", icon: Radio },
    { name: "NexaSMS", desc: "Business messaging: SMS, WhatsApp, RCS", icon: MessageCircle },
    { name: "NexaWebRTC", desc: "In-app voice/video calling APIs", icon: Video },
    { name: "NexaBridge", desc: "Omnichannel routing engine", icon: Workflow },
  ]},
  { id: "platform", label: "Platform & Infra", products: [
    { name: "Zynthra Platform", desc: "Unified AI + human harmony layer", icon: Layers },
    { name: "NexaStudio", desc: "No-code agent & bot builder", icon: Wand2 },
    { name: "NexaOps", desc: "LLM orchestration & deployment", icon: Cpu },
    { name: "NexaEdge", desc: "On-device / edge AI inference", icon: Server },
    { name: "NexaVault", desc: "Encrypted data store & compliance vault", icon: Lock },
    { name: "NexaFlow", desc: "Visual workflow automation builder", icon: GitBranch },
  ]},
  { id: "dev", label: "Developer Tools", products: [
    { name: "NexaAPI", desc: "REST + WebSocket APIs", icon: Code2 },
    { name: "NexaSDK", desc: "Mobile & web SDKs (iOS, Android, JS)", icon: Smartphone },
    { name: "NexaMCP", desc: "Model context protocol server", icon: BoxSelect },
    { name: "NexaDocs", desc: "Interactive API documentation", icon: FileText },
    { name: "NexaWebhooks", desc: "Real-time event streaming", icon: Rss },
    { name: "NexaSandbox", desc: "Live testing environment", icon: FlaskConical },
  ]},
];

const ACCENTS = ["cyan", "violet", "coral", "cyan"] as const;

export function Products() {
  const [active, setActive] = useState("ai");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-cyan/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionTitle
          eyebrow="Products"
          title={<>One Platform.<br /><span className="text-gradient">Infinite Possibility.</span></>}
          subtitle="Every tool you need to build, automate, and scale — under one roof."
        />

        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex flex-wrap justify-center gap-2 p-2 glass rounded-2xl mx-auto w-fit">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="relative px-5 h-11 rounded-xl text-sm font-medium transition-all duration-300"
              >
                <motion.div
                  initial={false}
                  animate={{
                    background: active === t.id ? "var(--gradient-brand)" : "transparent",
                    boxShadow: active === t.id ? "0 0 20px rgba(0,245,255,0.3)" : "none",
                  }}
                  className="absolute inset-0 rounded-xl"
                />
                <span className={cn(
                  "relative z-10 transition-colors",
                  active === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="relative mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tab.products.map((p, i) => {
                const accent = ACCENTS[i % ACCENTS.length];
                const colors = {
                  cyan: "from-cyan/30 to-cyan/5 border-cyan/20",
                  violet: "from-accent/30 to-accent/5 border-accent/20",
                  coral: "from-destructive/30 to-destructive/5 border-destructive/20",
                };
                
                return (
                  <ScrollReveal key={p.name} delay={i * 0.05}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      whileHover={{ 
                        scale: 1.02, 
                      }}
                      className="group"
                    >
                      <div className={cn(
                        "relative rounded-2xl p-6 bg-gradient-to-br overflow-hidden",
                        colors[accent]
                      )}>
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
                        
                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-30 transition-transform duration-500 group-hover:scale-150" 
                          style={{ background: accent === "cyan" ? "rgba(0,245,255,0.3)" : accent === "violet" ? "rgba(123,47,255,0.3)" : "rgba(255,107,107,0.3)" }}
                        />
                        
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan/10 to-transparent" />
                          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                              className={cn(
                                "h-12 w-12 rounded-xl grid place-items-center",
                                accent === "violet" ? "bg-accent/20 text-accent" :
                                accent === "coral"  ? "bg-destructive/20 text-destructive" :
                                                       "bg-cyan/20 text-cyan",
                              )}
                            >
                              <p.icon className="h-6 w-6" />
                            </motion.div>
                            <motion.span 
                              whileHover={{ scale: 1.1 }}
                              className="text-[10px] font-mono text-muted-foreground px-2 py-1 rounded-md bg-white/5"
                            >
                              v3
                            </motion.span>
                          </div>
                          
                          <motion.h3 
                            className="mt-5 font-display text-xl font-bold"
                            whileHover={{ x: 5 }}
                          >
                            {p.name}
                          </motion.h3>
                          <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                          
                          <motion.button 
                            whileHover={{ x: 5, gap: "0.75rem" }}
                            className="mt-5 inline-flex items-center gap-1 text-xs text-cyan opacity-0 group-hover:opacity-100 transition-all"
                          >
                            Learn more 
                            <ArrowRight className="h-3 w-3" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}