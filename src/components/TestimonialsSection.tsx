import { Quote } from "lucide-react";
import { useContentValue } from "@/hooks/useSiteContent";

const TestimonialsSection = () => {
  const label = useContentValue("testimonials", "label", "〰〰 Depoimentos 〰〰");
  const title = useContentValue("testimonials", "title", "Síndicos que confiam na Nômade");
  const t1Text = useContentValue("testimonials", "testimonial_1_text", "A Nômade transformou a administração do nosso condomínio. Relatórios claros, atendimento ágil e total transparência nas finanças. Recomendo com toda a certeza!");
  const t1Name = useContentValue("testimonials", "testimonial_1_name", "Carlos Mendes");
  const t1Role = useContentValue("testimonials", "testimonial_1_role", "Síndico - Condomínio Solar das Flores");
  const t1Visible = useContentValue("testimonials", "testimonial_1_visible", "true");
  const t2Text = useContentValue("testimonials", "testimonial_2_text", "Equipe fantástica e sempre disponível. Finalmente temos uma administradora que faz parceria de verdade. O apoio nas assembleias é excelente.");
  const t2Name = useContentValue("testimonials", "testimonial_2_name", "Ana Beatriz Silva");
  const t2Role = useContentValue("testimonials", "testimonial_2_role", "Síndica - Residencial Alvorada");
  const t2Visible = useContentValue("testimonials", "testimonial_2_visible", "true");
  const t3Text = useContentValue("testimonials", "testimonial_3_text", "Profissionalismo acima de tudo. A Nômade cuida do nosso condomínio com organização e atenção que nunca tivemos antes. Estamos muito satisfeitos.");
  const t3Name = useContentValue("testimonials", "testimonial_3_name", "Roberto Ferreira");
  const t3Role = useContentValue("testimonials", "testimonial_3_role", "Síndico - Condomínio Jardim Europa");
  const t3Visible = useContentValue("testimonials", "testimonial_3_visible", "true");

  const allTestimonials = [
    { text: t1Text, name: t1Name, role: t1Role, visible: t1Visible },
    { text: t2Text, name: t2Name, role: t2Role, visible: t2Visible },
    { text: t3Text, name: t3Name, role: t3Role, visible: t3Visible },
  ];

  const testimonials = allTestimonials.filter((t) => t.visible !== "false");

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="section-label mb-2">{label}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        <div className={`grid gap-6 ${testimonials.length === 1 ? "max-w-lg mx-auto" : testimonials.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`}>
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
};

export default TestimonialsSection;
