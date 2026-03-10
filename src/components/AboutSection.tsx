import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about-img.jpg";

const features = [
  "Gestão financeira completa e transparente",
  "Equipe especializada e humanizada",
  "Tecnologia a serviço da sua comunidade",
  "Suporte dedicado ao síndico profissional",
];

const stats = [
  { number: "100+", label: "Condomínios Administrados" },
  { number: "5.000+", label: "Unidades Habitacionais" },
  { number: "15.000+", label: "Moradores" },
  { number: "10+", label: "Anos de Experiência" },
];

const AboutSection = () => (
  <section id="quem-somos" className="py-20 bg-dark-surface">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src={aboutImg} alt="Gestão condominial profissional" className="rounded-lg w-full object-cover max-h-[500px]" />
          <div className="absolute bottom-6 left-6 bg-primary text-primary-foreground p-4 rounded-lg">
            <p className="text-3xl font-bold">10+</p>
            <p className="text-sm">anos de experiência</p>
          </div>
        </div>

        <div>
          <p className="section-label mb-2">〰〰 Conheça a Nômade 〰〰</p>
          <h2 className="section-title mb-6">Por que escolher a Nômade?</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Somos uma nova geração de administradora de condomínios. Nascemos com uma visão clara: modernizar a gestão condominial e transformar a forma como síndicos e condôminos vivenciam a administração do seu patrimônio. Unimos gestão estratégica, suporte humanizado e soluções práticas para tornar o dia a dia do condomínio mais leve, seguro e organizado.
          </p>
          <ul className="space-y-4 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button className="bg-primary text-primary-foreground hover:bg-gold-dark font-semibold px-8">SAIBA MAIS</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="stat-number">{s.number}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
