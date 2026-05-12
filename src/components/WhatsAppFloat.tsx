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
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-0 hover:gap-3 bg-[#25D366] text-white shadow-lg rounded-full pl-4 pr-4 h-14 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle className="w-7 h-7 flex-shrink-0" />
      <span className="max-w-0 group-hover:max-w-[200px] opacity-0 group-hover:opacity-100 whitespace-nowrap font-semibold text-sm transition-all duration-300 overflow-hidden">
        Fale conosco
      </span>
    </a>
  );
};

export default WhatsAppFloat;