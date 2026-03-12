import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about-img.jpg";
import { useContentValue, useImageValue } from "@/hooks/useSiteContent";

const AboutSection = () => {
  const label = useContentValue("about", "label", "〰〰 Conheça a Nômade 〰〰");
  const title = useContentValue("about", "title", "Por que escolher a Nômade?");
  const description = useContentValue("about", "description", "Somos uma nova geração de administradora de condomínios. Nascemos com uma visão clara: modernizar a gestão condominial e transformar a forma como síndicos e condôminos vivenciam a administração do seu patrimônio. Unimos gestão estratégica, suporte humanizado e soluções práticas para tornar o dia a dia do condomínio mais leve, seguro e organizado.");
  const feature1 = useContentValue("about", "feature_1", "Gestão financeira completa e transparente");
  const feature2 = useContentValue("about", "feature_2", "Equipe especializada e humanizada");
  const feature3 = useContentValue("about", "feature_3", "Tecnologia a serviço da sua comunidade");
  const feature4 = useContentValue("about", "feature_4", "Suporte dedicado ao síndico profissional");
  const stat1Num = useContentValue("about", "stat_1_number", "100+");
  const stat1Label = useContentValue("about", "stat_1_label", "Condomínios Administrados");
  const stat2Num = useContentValue("about", "stat_2_number", "5.000+");
  const stat2Label = useContentValue("about", "stat_2_label", "Unidades Habitacionais");
  const stat3Num = useContentValue("about", "stat_3_number", "15.000+");
  const stat3Label = useContentValue("about", "stat_3_label", "Moradores");
  const stat4Num = useContentValue("about", "stat_4_number", "10+");
  const stat4Label = useContentValue("about", "stat_4_label", "Anos de Experiência");
  const mainImage = useImageValue("about", "main", aboutImg);

  const features = [feature1, feature2, feature3, feature4];
  const stats = [
  { number: stat1Num, label: stat1Label },
  { number: stat2Num, label: stat2Label },
  { number: stat3Num, label: stat3Label },
  { number: stat4Num, label: stat4Label }];


  return (
    <section id="quem-somos" className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={mainImage} alt="Gestão condominial profissional" className="rounded-lg w-full object-cover max-h-[500px]" />
            <div className="absolute bottom-6 left-6 bg-primary text-primary-foreground p-4 rounded-lg">
              <p className="text-3xl font-bold">{stat4Num}</p>
              <p className="text-sm">anos de experiência</p>
            </div>
          </div>

          <div>
            <p className="section-label mb-2">{label}</p>
            <h2 className="section-title mb-6">{title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
            <ul className="space-y-4 mb-8">
              {features.map((f) =>
              <li key={f} className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {f}
                </li>
              )}
            </ul>
            <Button className="bg-primary text-primary-foreground hover:bg-gold-dark font-semibold px-8">SAIBA MAIS</Button>
          </div>
        </div>

        






        
      </div>
    </section>);

};

export default AboutSection;