import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section id="inicio" className="relative min-h-[90vh] flex items-center">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Cidade ao pôr do sol" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
    </div>

    <div className="relative container mx-auto px-4 py-20">
      <p className="section-label mb-4">〰〰 NÔMADE ADMINISTRADORA</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl mb-6">
        Administração condominial de{" "}
        <span className="text-primary">alto padrão.</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
        Gestão profissional, transparente e humanizada.<br />
        Cuidamos do seu condomínio como se fosse nosso.
      </p>
      <div className="flex flex-wrap gap-4 mb-16">
        <Button className="bg-primary text-primary-foreground hover:bg-gold-dark font-semibold px-8 py-6 text-base gap-2">
          SAIBA MAIS <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="border-foreground/30 text-foreground hover:bg-foreground/10 px-8 py-6 text-base gap-2">
          <MessageCircle className="w-4 h-4" /> Fale Conosco
        </Button>
      </div>

      <div className="border-t border-foreground/20 pt-8 flex gap-12">
        <div>
          <p className="stat-number">100+</p>
          <p className="stat-label">Condomínios</p>
        </div>
        <div>
          <p className="stat-number">5.000+</p>
          <p className="stat-label">Unidades</p>
        </div>
        <div>
          <p className="stat-number">10+</p>
          <p className="stat-label">Anos de experiência</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
