import { Database, BarChart3, Headphones, Shield, Zap, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import sindicoImg from "@/assets/sindico-img.jpg";

const diferenciais = [
  { icon: Database, label: "Dados Organizados" },
  { icon: BarChart3, label: "Relatórios Claros" },
  { icon: Headphones, label: "Suporte Constante" },
  { icon: Shield, label: "Segurança Jurídica" },
  { icon: Zap, label: "Agilidade Operacional" },
  { icon: Handshake, label: "Parceria Real" },
];

const SindicoSection = () => (
  <section id="sindicos" className="py-20 bg-dark-surface">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <div className="relative">
          <img src={sindicoImg} alt="Síndico Profissional" className="rounded-lg w-full max-h-[450px] object-cover" />
          <div className="absolute top-6 right-6 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Para Síndicos Profissionais</p>
            <p className="text-lg font-bold text-foreground">Aqui, o síndico não trabalha sozinho.</p>
          </div>
        </div>

        <div>
          <p className="section-label mb-2">〰〰 Diferenciais</p>
          <h2 className="section-title mb-6">Suporte completo para o síndico</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Sabemos que o síndico precisa de mais do que uma administradora operacional. Precisa de parceria, agilidade e informações confiáveis para tomar decisões com segurança.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {diferenciais.map((d) => (
              <div key={d.label} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
                <d.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{d.label}</span>
              </div>
            ))}
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-gold-dark font-semibold px-8">SAIBA MAIS</Button>
        </div>
      </div>
    </div>
  </section>
);

export default SindicoSection;
