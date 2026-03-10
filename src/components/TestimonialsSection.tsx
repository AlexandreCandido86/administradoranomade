import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "A Nômade transformou a administração do nosso condomínio. Relatórios claros, atendimento ágil e total transparência nas finanças. Recomendo com toda a certeza!",
    name: "Carlos Mendes",
    role: "Síndico - Condomínio Solar das Flores",
  },
  {
    text: "Equipe fantástica e sempre disponível. Finalmente temos uma administradora que faz parceria de verdade. O apoio nas assembleias é excelente.",
    name: "Ana Beatriz Silva",
    role: "Síndica - Residencial Alvorada",
  },
  {
    text: "Profissionalismo acima de tudo. A Nômade cuida do nosso condomínio com organização e atenção que nunca tivemos antes. Estamos muito satisfeitos.",
    name: "Roberto Ferreira",
    role: "Síndico - Condomínio Jardim Europa",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="section-label mb-2">〰〰 Depoimentos 〰〰</p>
        <h2 className="section-title">Síndicos que confiam na Nômade</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card border border-border rounded-lg p-6 relative">
            <Quote className="w-8 h-8 text-primary/30 mb-4" />
            <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
            <div>
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
