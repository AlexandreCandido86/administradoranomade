import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentValue } from "@/hooks/useSiteContent";

const ContactSection = () => {
  const label = useContentValue("contact", "label", "FALE CONOSCO");
  const title = useContentValue("contact", "title", "Entre em contato com nossa equipe comercial e solicite orçamento para o seu condomínio.");
  const phone = useContentValue("contact", "phone", "(11) 99999-9999");
  const email = useContentValue("contact", "email", "contato@nomade.com.br");

  return (
    <section id="contato" className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary-foreground/70 text-sm font-semibold tracking-widest uppercase mb-2">{label}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 max-w-2xl mx-auto">{title}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 px-6 py-5">
            <Phone className="w-4 h-4" /> {phone}
          </Button>
          <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 px-6 py-5">
            <Mail className="w-4 h-4" /> {email}
          </Button>
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 px-6 py-5 font-semibold">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
