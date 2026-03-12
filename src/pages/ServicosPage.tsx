import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DollarSign, FileText, Users, MessageSquare, Calendar } from "lucide-react";
import { useContentValue } from "@/hooks/useSiteContent";

const defaultServices = [
  { icon: DollarSign, titleKey: "service_1_title", descKey: "service_1_desc", defaultTitle: "Gestão Financeira", defaultDesc: "Controle rigoroso de receitas e despesas, boletos, balancetes claros e prestação de contas transparente." },
  { icon: FileText, titleKey: "service_2_title", descKey: "service_2_desc", defaultTitle: "Gestão Administrativa", defaultDesc: "Organização documental, cumprimento de obrigações legais e suporte estratégico ao síndico." },
  { icon: Users, titleKey: "service_3_title", descKey: "service_3_desc", defaultTitle: "Assessoria ao Síndico", defaultDesc: "Orientação prática para tomada de decisões seguras e alinhadas à legislação condominial." },
  { icon: MessageSquare, titleKey: "service_4_title", descKey: "service_4_desc", defaultTitle: "Atendimento ao Condômino", defaultDesc: "Comunicação clara, ágil e humanizada para todos os moradores do condomínio." },
  { icon: Calendar, titleKey: "service_5_title", descKey: "service_5_desc", defaultTitle: "Apoio em Assembleias", defaultDesc: "Organização e suporte para garantir reuniões mais produtivas e bem conduzidas." },
];

const ServicosPage = () => {
  const label = useContentValue("services", "label", "〰〰 Nossos Serviços 〰〰");
  const title = useContentValue("services", "title", "Leve a mudança para o seu condomínio");
  const pageIntro = useContentValue("services_page", "intro", "Conheça todos os nossos serviços de gestão condominial e descubra como podemos transformar o seu condomínio.");

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <section className="py-16 bg-dark-surface">
        <div className="container mx-auto px-4 text-center">
          <p className="section-label mb-2">{label}</p>
          <h1 className="section-title text-4xl md:text-5xl mb-4">{title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{pageIntro}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {defaultServices.map((s) => (
              <ServiceDetailCard key={s.titleKey} {...s} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function ServiceDetailCard({ icon: Icon, titleKey, descKey, defaultTitle, defaultDesc }: any) {
  const t = useContentValue("services", titleKey, defaultTitle);
  const d = useContentValue("services", descKey, defaultDesc);
  const detail = useContentValue("services_page", `${titleKey}_detail`, "");
  return (
    <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors group">
      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{t}</h3>
      <p className="text-muted-foreground leading-relaxed">{d}</p>
      {detail && <p className="text-muted-foreground leading-relaxed mt-3">{detail}</p>}
    </div>
  );
}

export default ServicosPage;
