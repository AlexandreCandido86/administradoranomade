import { DollarSign, FileText, Users, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: DollarSign, title: "Gestão Financeira", desc: "Controle rigoroso de receitas e despesas, boletos, balancetes claros e prestação de contas transparente." },
  { icon: FileText, title: "Gestão Administrativa", desc: "Organização documental, cumprimento de obrigações legais e suporte estratégico ao síndico." },
  { icon: Users, title: "Assessoria ao Síndico", desc: "Orientação prática para tomada de decisões seguras e alinhadas à legislação condominial." },
  { icon: MessageSquare, title: "Atendimento ao Condômino", desc: "Comunicação clara, ágil e humanizada para todos os moradores do condomínio." },
  { icon: Calendar, title: "Apoio em Assembleias", desc: "Organização e suporte para garantir reuniões mais produtivas e bem conduzidas." },
];

const ServicesSection = () => (
  <section id="servicos" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="section-label mb-2">〰〰 Nossos Serviços 〰〰</p>
        <h2 className="section-title">Leve a mudança para o seu condomínio</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((s) => (
          <div key={s.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}

        <div className="bg-primary rounded-lg p-6 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-primary-foreground mb-2">Precisa de uma solução personalizada?</h3>
          <p className="text-sm text-primary-foreground/80 mb-4">Entre em contato e descubra como podemos ajudar o seu condomínio.</p>
          <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-fit">
            VER SERVIÇOS
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
