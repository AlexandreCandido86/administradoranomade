import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { useContentValue, useImageValue } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const label = useContentValue("hero", "label", "〰〰 NÔMADE ADMINISTRADORA");
  const title = useContentValue("hero", "title", "Administração condominial de");
  const titleHighlight = useContentValue("hero", "title_highlight", "alto padrão.");
  const subtitle = useContentValue("hero", "subtitle", "Gestão profissional, transparente e humanizada.\nCuidamos do seu condomínio como se fosse nosso.");
  const ctaPrimary = useContentValue("hero", "cta_primary", "SAIBA MAIS");
  const ctaSecondary = useContentValue("hero", "cta_secondary", "Fale Conosco");
  const bgImage = useImageValue("hero", "bg", heroBg);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img src={bgImage} alt="Cidade ao pôr do sol" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <p className="section-label mb-4">{label}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl mb-6">
          {title}{" "}
          <span className="text-primary">{titleHighlight}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed whitespace-pre-line">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-gold-dark font-semibold px-8 py-6 text-base gap-2">
            <Link to="/quem-somos">{ctaPrimary} <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-foreground/30 text-foreground hover:bg-foreground/10 px-8 py-6 text-base gap-2">
            <Link to="/contato"><MessageCircle className="w-4 h-4" /> {ctaSecondary}</Link>
          </Button>
        </div>
        <p className="text-sm md:text-base text-muted-foreground italic tracking-wide mb-16">
          {tagline}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
