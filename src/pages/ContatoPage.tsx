import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useContentValue, useDecorator } from "@/hooks/useSiteContent";
import { trackLeadConversion } from "@/lib/gtagConversion";

const ContatoPage = () => {
  const dec = useDecorator();
  const label = useContentValue("contact", "label", "FALE CONOSCO");
  const title = useContentValue("contact", "title", "Entre em contato com nossa equipe comercial e solicite orçamento para o seu condomínio.");
  const phone = useContentValue("contact", "phone", "(11) 99999-9999");
  const email = useContentValue("contact", "email", "contato@nomade.com.br");
  const address = useContentValue("contact", "address", "Campo Largo, PR");
  const whatsapp = useContentValue("contact", "whatsapp", "(11) 99999-9999");
  const pageIntro = useContentValue("contato_page", "intro", "Estamos à disposição para atender você. Entre em contato por qualquer um dos nossos canais.");
  const hours = useContentValue("contato_page", "hours", "Segunda a Sexta, das 9h às 18h");

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Contato" description="Entre em contato com a Nômade Administradora de Condomínios. Solicite orçamento para gestão do seu condomínio em Campo Largo, Paraná." canonical="/contato" />
      <TopBar />
      <Navbar />

      <section className="py-16 bg-dark-surface">
        <div className="container mx-auto px-4 text-center">
          <p className="section-label mb-2">{dec} {label} {dec}</p>
          <h1 className="section-title text-4xl md:text-5xl mb-4">Contato</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{pageIntro}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground leading-relaxed text-center mb-12">{title}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-8 flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
                  <p className="text-muted-foreground">{phone}</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">E-mail</h3>
                  <p className="text-muted-foreground break-all">{email}</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Horário</h3>
                  <p className="text-muted-foreground">{hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-2">WhatsApp</p>
              <a
                href={`https://wa.me/55${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLeadConversion()}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-md hover:bg-gold-dark transition-colors"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContatoPage;
