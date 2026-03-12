import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  const stat4Num = useContentValue("about", "stat_4_number", "Muito+");
  const stat4Label = useContentValue("about", "stat_4_label", "experiência");
  const mainImage = useImageValue("about", "main", aboutImg);

  const features = [feature1, feature2, feature3, feature4];

  return (
    <section id="quem-somos" className="py-20 bg-[#f7f7f7]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {mainImage && <img src={mainImage} alt="Gestão condominial profissional" className="rounded-lg w-full object-cover max-h-[500px]" />}
            <div className="absolute bottom-6 left-6 bg-primary text-primary-foreground p-4 rounded-lg">
              <p className="text-3xl font-bold">{stat4Num}</p>
              <p className="text-sm">{stat4Label}</p>
            </div>
          </div>

          <div>
            <p className="section-label mb-2">{label}</p>
            <h2 className="section-title mb-6 text-black">{title}</h2>
            <p className="text-black leading-relaxed mb-8">{description}</p>
            <ul className="space-y-4 mb-8">
              {features.map((f) =>
              <li key={f} className="flex items-center gap-3 text-black">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {f}
                </li>
              )}
            </ul>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-gold-dark font-semibold px-8">
              <Link to="/quem-somos">SAIBA MAIS</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default AboutSection;