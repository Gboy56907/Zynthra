import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { SocialProof } from "@/components/site/SocialProof";
import { Products } from "@/components/site/Products";
import { AiShowcase } from "@/components/site/AiShowcase";
import { Solutions } from "@/components/site/Solutions";
import { Pricing } from "@/components/site/Pricing";
import { Resources } from "@/components/site/Resources";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zynthra — Sovereign AI Platform for Enterprise Automation" },
      { name: "description", content: "Unified AI + cloud platform for enterprise-grade automation. Build AI agents, voice bots, and automation workflows — no coding required." },
      { property: "og:title", content: "Zynthra — Sovereign AI Platform for Enterprise Automation" },
      { property: "og:description", content: "Unified AI + cloud platform for enterprise-grade automation" },
      { name: "keywords", content: "AI platform, enterprise AI, AI agents, voice bot, automation, no-code builder, LLM orchestration" },
      { rel: "canonical", href: "https://zynthra.com/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Products />
      <AiShowcase />
      <Solutions />
      <Pricing />
      <Resources />
      <About />
      <Contact />
    </>
  );
}
