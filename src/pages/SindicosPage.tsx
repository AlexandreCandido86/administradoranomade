import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Database, BarChart3, Headphones, Shield, Zap, Handshake } from "lucide-react";
import { useContentValue, useImageValue, useDecorator } from "@/hooks/useSiteContent";
import sindicoImg from "@/assets/sindico-img.jpg";

const diferenciais = [
  { icon: Database, label: "Dados Organizados" },
  { icon: BarChart3, label: "Relatórios Claros" },
  { icon: Headphones, label: "Suporte Constante" },
  { icon: Shield, label: "Segurança Jurídica" },
  { icon: Zap, label: "Agilidade Operacional" },
  { icon: Handshake, label: "Parceria Real" },
];

const SindicosPage = () => {
  const dec = useDecorator();
  const label = useContentValue("sindico", "label", "Diferenciais");
  const title = useContentValue("sindico", "title", "Suporte completo para o síndico");
  const description = useContentValue("sindico", "description", "Sabemos que o síndico precisa de mais do que uma administradora operacional. Precisa de parceria, agilidade e informações confiáveis para tomar decisões com segurança.");
  const cardSubtitle = useContentValue("sindico", "card_subtitle", "Para Síndicos Profissionais");
  const cardText = useContentValue("sindico", "card_text", "Aqui, o síndico não trabalha sozinho.");
  const mainImage = useImageValue("sindico", "main", sindicoImg);
  const pageIntro = useContentValue("sindicos_page", "intro", "Descubra como apoiamos síndicos profissionais com ferramentas, dados e suporte dedicado.");
  const pageDetail = useContentValue("sindicos_page", "detail", "Na Nômade, entendemos que a função de síndico exige dedicação, conhecimento e suporte constante. Por isso, desenvolvemos um modelo de parceria que vai além da administração tradicional. Oferecemos um conjunto completo de ferramentas e serviços para que o síndico possa atuar com mais segurança, agilidade e eficiência.");

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <section className="py-16 bg-dark-surface">
        <div className="container mx-auto px-4 text-center">
          <p className="section-label mb-2">{dec} {label} {dec}</p>
          <h1 className="section-title text-4xl md:text-5xl mb-4">{title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{pageIntro}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative">
              {mainImage && <img src={mainImage} alt="Síndico Profissional" className="rounded-lg w-full max-h-[450px] object-cover" />}
              <div className="mt-4 bg-card p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">{cardSubtitle}</p>
                <p className="text-lg font-bold text-foreground">{cardText}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{pageDetail}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {diferenciais.map((d) => (
              <div key={d.label} className="flex items-center gap-4 bg-card border border-border rounded-lg p-5">
                <d.icon className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SindicosPage;
