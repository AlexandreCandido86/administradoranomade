import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useContentValue, useDecorator } from "@/hooks/useSiteContent";

const ContactSection = () => {
  const dec = useDecorator();
  const label = useContentValue("contact", "label", "FALE CONOSCO");
  const title = useContentValue("contact", "title", "Entre em contato com nossa equipe comercial e solicite orçamento para o seu condomínio.");
  const phone = useContentValue("contact", "phone", "(11) 99999-9999");
  const email = useContentValue("contact", "email", "contato@nomade.com.br");
  const address = useContentValue("contact", "address", "São Paulo, SP");
  const whatsapp = useContentValue("contact", "whatsapp", "(11) 99999-9999");
  const whatsappUrl = `https://wa.me/55${whatsapp.replace(/\D/g, "")}`;

  return (
    <section id="contato" className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary-foreground/80 text-sm font-semibold tracking-[0.25em] uppercase mb-2">〰〰 {label} 〰〰</p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">{title}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary-foreground" />
            <span className="text-primary-foreground">{phone}</span>
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <Mail className="w-5 h-5 text-primary-foreground flex-shrink-0" />
            <span className="text-primary-foreground break-all">{email}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary-foreground" />
            <span className="text-primary-foreground">{address}</span>
          </div>
        </div>
        <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 gap-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4" /> FALE PELO WHATSAPP</a>
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;
