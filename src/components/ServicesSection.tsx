import { DollarSign, FileText, Users, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useContentValue } from "@/hooks/useSiteContent";

const defaultServices = [
  { icon: DollarSign, titleKey: "service_1_title", descKey: "service_1_desc", defaultTitle: "Gestão Financeira", defaultDesc: "Controle rigoroso de receitas e despesas, boletos, balancetes claros e prestação de contas transparente." },
  { icon: FileText, titleKey: "service_2_title", descKey: "service_2_desc", defaultTitle: "Gestão Administrativa", defaultDesc: "Organização documental, cumprimento de obrigações legais e suporte estratégico ao síndico." },
  { icon: Users, titleKey: "service_3_title", descKey: "service_3_desc", defaultTitle: "Assessoria ao Síndico", defaultDesc: "Orientação prática para tomada de decisões seguras e alinhadas à legislação condominial." },
  { icon: MessageSquare, titleKey: "service_4_title", descKey: "service_4_desc", defaultTitle: "Atendimento ao Condômino", defaultDesc: "Comunicação clara, ágil e humanizada para todos os moradores do condomínio." },
  { icon: Calendar, titleKey: "service_5_title", descKey: "service_5_desc", defaultTitle: "Apoio em Assembleias", defaultDesc: "Organização e suporte para garantir reuniões mais produtivas e bem conduzidas." },
];

const ServicesSection = () => {
  const label = useContentValue("services", "label", "〰〰 Nossos Serviços 〰〰");
  const title = useContentValue("services", "title", "Leve a mudança para o seu condomínio");
  const ctaTitle = useContentValue("services", "cta_title", "Precisa de uma solução personalizada?");
  const ctaDesc = useContentValue("services", "cta_desc", "Entre em contato e descubra como podemos ajudar o seu condomínio.");

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="section-label mb-2">{label}</p>
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {defaultServices.map((s) => (
            <ServiceCard key={s.titleKey} {...s} />
          ))}
          <div className="bg-primary rounded-lg p-6 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">{ctaTitle}</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">{ctaDesc}</p>
            <Button asChild className="bg-white text-background hover:bg-white/90 w-fit">
              <Link to="/servicos">VER SERVIÇOS</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

function ServiceCard({ icon: Icon, titleKey, descKey, defaultTitle, defaultDesc }: any) {
  const t = useContentValue("services", titleKey, defaultTitle);
  const d = useContentValue("services", descKey, defaultDesc);
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{t}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}

export default ServicesSection;
