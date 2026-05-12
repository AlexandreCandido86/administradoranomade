import { MessageCircle } from "lucide-react";
import { useContentValue } from "@/hooks/useSiteContent";

const WhatsAppFloat = () => {
  const whatsapp = useContentValue("contact", "whatsapp", "(11) 99999-9999");
  const url = `https://wa.me/55${whatsapp.replace(/\D/g, "")}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform animate-pulse"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppFloat;