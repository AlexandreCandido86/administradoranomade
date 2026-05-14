// Helper para disparar a conversão "Enviar formulário de lead" do Google Ads
// ID de conversão: AW-11548833977 / EnZJCIyOpakcELnx9IIr
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackLeadConversion = () => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: "AW-11548833977/EnZJCIyOpakcELnx9IIr",
    value: 1.0,
    currency: "BRL",
  });
};