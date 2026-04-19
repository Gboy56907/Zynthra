import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
import { SectionTitle } from "./Reveal";
import { NxButton } from "./NxButton";
import { AuthModal } from "./AuthModal";
import { HolographicCard } from "./HolographicCard";
import { ScrollReveal } from "./ScrollAnimation";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    id: "starter", name: "Starter", monthly: 0, annual: 0, suffix: "Free",
    cta: "Get Started Free",
    features: ["1,000 API calls / month", "1 AI Agent", "Community support", "Basic analytics", "NexaSDK access"],
  },
  {
    id: "growth", name: "Growth", monthly: 99, annual: 79, suffix: "/month",
    cta: "Start Free Trial", popular: true,
    features: ["100,000 API calls / month", "10 AI Agents", "NexaVoice + NexaChat", "Priority support", "Advanced analytics", "Webhook access"],
  },
  {
    id: "enterprise", name: "Enterprise", monthly: null, annual: null, suffix: "Custom",
    cta: "Contact Sales",
    features: ["Unlimited everything", "Dedicated infrastructure", "SLA guarantee", "Custom integrations", "SSO + RBAC", "Onboarding team"],
  },
];

const TESTIMONIALS = [
  {
    quote: "Switched from 5 vendors to Zynthra. Saved $40k/year and cut our dev time in half.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow",
  },
  {
    quote: "The no-code builder let us deploy AI agents in days, not months. Game changer.",
    author: "Marcus Johnson",
    role: "VP Engineering",
    company: "ScaleAI",
  },
  {
    quote: "Finally, an enterprise platform that doesn't feel like it was built for startups.",
    author: "Elena Rodriguez",
    role: "Director of Innovation",
    company: "GlobalBank",
  },
];

const FAQS = [
  { q: "Can I upgrade anytime?", a: "Yes, scale up with one click. No migrations, no fees." },
  { q: "What's included in the free tier?", a: "1,000 API calls, 1 AI Agent, community support, and full NexaSDK access." },
  { q: "What happens if I exceed my limits?", a: "We'll notify you before hitting limits. Auto-upgrade or pay-as-you-go available." },
  { q: "Is there a money-back guarantee?", a: "30 days, no questions asked. Full refund, no hard feelings." },
  { q: "Do you offer startup pricing?", a: "Yes! Early-stage startups get 50% off Growth for the first year." },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [auth, setAuth] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet/10 blur-3xl animate-pulse-glow animate-delay-200" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionTitle
          eyebrow="Pricing"
          title={<>Plans That <span className="text-gradient">Scale With You</span></>}
          subtitle="No hidden fees. No vendor lock-in. Cancel anytime."
        />

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex justify-center items-center gap-4">
            <span className={cn("text-sm font-medium transition-colors", !annual ? "text-foreground" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual((a) => !a)}
              className={cn(
                "relative h-8 w-14 rounded-full transition-all duration-300",
                annual ? "bg-gradient-brand shadow-glow-cyan" : "bg-white/10 border border-white/10",
              )}
              aria-label="Toggle annual billing"
            >
              <motion.span
                layout
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className={cn(
                  "absolute top-1 h-6 w-6 rounded-full bg-background shadow-lg",
                  annual ? "left-[26px]" : "left-1",
                )}
              />
            </button>
            <span className={cn("text-sm font-medium flex items-center gap-2", annual ? "text-foreground" : "text-muted-foreground")}>
              Annual
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan/20 text-cyan border border-cyan/30 animate-pulse-border">
                SAVE 20%
              </span>
            </span>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier, i) => {
            const price = tier.monthly === null ? null : (annual ? tier.annual : tier.monthly);
            const isHovered = hoveredTier === tier.id;
            
            return (
              <ScrollReveal key={tier.id} delay={i * 0.1}>
                <motion.div
                  onMouseEnter={() => setHoveredTier(tier.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                  className="relative h-full"
                  animate={{ 
                    scale: isHovered ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {tier.popular && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-brand blur-xl opacity-50" />
                        <div className="relative flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-primary-foreground shadow-lg">
                          <Sparkles className="h-3 w-3" /> 
                          Most Popular
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <HolographicCard className={cn(
                    "h-full p-8 transition-all duration-500",
                    tier.popular && "border-cyan/30 glow-cyan",
                  )}>
                    <div className={cn(
                      "absolute inset-0 rounded-2xl transition-opacity",
                      tier.popular ? "opacity-100" : "opacity-0",
                    )}>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand" />
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-brand" />
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="font-display text-2xl font-extrabold">{tier.name}</h3>
                      <div className="mt-4 flex items-baseline gap-1">
                        {price !== null && price !== undefined ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="font-display text-5xl font-extrabold text-gradient">
                              ${price}
                            </span>
                            <span className="text-muted-foreground ml-1">{tier.suffix}</span>
                          </motion.div>
                        ) : (
                          <span className="font-display text-4xl font-extrabold">{tier.suffix}</span>
                        )}
                      </div>
                      
                      <ul className="mt-6 space-y-3">
                        {tier.features.map((f, j) => (
                          <motion.li 
                            key={f}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + j * 0.05 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              className="mt-0.5 flex-shrink-0"
                            >
                              <Check className="h-4 w-4 text-cyan" />
                            </motion.div>
                            <span>{f}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8"
                      >
                        <NxButton
                          size="lg"
                          variant={tier.popular ? "primary" : "ghost"}
                          className="w-full"
                          onClick={() => setAuth(true)}
                        >
                          {tier.cta}
                        </NxButton>
                      </motion.div>
                    </div>
                  </HolographicCard>
                  
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -inset-2 rounded-3xl bg-gradient-brand opacity-20 blur-xl -z-10"
                    />
                  )}
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-20">
            <div className="flex justify-center gap-2 mb-10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium ml-2">4.9/5 from 200+ reviews</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm italic text-muted-foreground">"{t.quote}"</p>
                  <div className="mt-4">
                    <p className="font-medium">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role} at {t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-20 max-w-3xl mx-auto">
            <SectionTitle
              eyebrow="FAQ"
              title={<>Common <span className="text-gradient">Questions</span></>}
              subtitle=""
            />
            <div className="mt-8 space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <dt className="font-medium">{faq.q}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
      <AuthModal open={auth} onClose={() => setAuth(false)} />
    </section>
  );
}