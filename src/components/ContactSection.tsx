import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => (
  <section id="contato" className="py-20 bg-primary">
    <div className="container mx-auto px-4 text-center">
      <p className="text-primary-foreground/70 text-sm font-semibold tracking-widest uppercase mb-2">FALE CONOSCO</p>
      <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 max-w-2xl mx-auto">
        Entre em contato com nossa equipe comercial e solicite orçamento para o seu condomínio.
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 px-6 py-5">
          <Phone className="w-4 h-4" /> (11) 99999-9999
        </Button>
        <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 px-6 py-5">
          <Mail className="w-4 h-4" /> contato@nomade.com.br
        </Button>
        <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 px-6 py-5 font-semibold">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </Button>
      </div>
    </div>
  </section>
);

export default ContactSection;
