import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentValue } from "@/hooks/useSiteContent";

const ContactSection = () => {
  const label = useContentValue("contact", "label", "FALE CONOSCO");
  const title = useContentValue("contact", "title", "Entre em contato com nossa equipe comercial e solicite orçamento para o seu condomínio.");
  const phone = useContentValue("contact", "phone", "(11) 99999-9999");
  const email = useContentValue("contact", "email", "contato@nomade.com.br");

  return;


















};

export default ContactSection;