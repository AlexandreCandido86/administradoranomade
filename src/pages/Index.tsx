import { lazy, Suspense } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Lazy load sections below the fold
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SindicoSection = lazy(() => import("@/components/SindicoSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nômade Administradora de Condomínios",
  "description": "Administradora de condomínios em Campo Largo, Paraná. Gestão financeira, assessoria ao síndico, atendimento humanizado e tecnologia.",
  "url": "https://www.nomadecondominios.com.br/",
  "telephone": "+55 41 99588-1322",
  "email": "contato@nomadecondominios.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Marechal Deodoro, 1322, sala 04",
    "addressLocality": "Campo Largo",
    "addressRegion": "PR",
    "postalCode": "83601-000",
    "addressCountry": "BR"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "serviceArea": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": -25.46, "longitude": -49.53 } },
  "sameAs": []
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Nômade Administradora de Condomínios"
      description="Administradora de condomínios em Campo Largo, Paraná. Gestão financeira, assessoria ao síndico, atendimento humanizado e tecnologia para seu condomínio."
      canonical="/"
      jsonLd={jsonLd}
    />
    <TopBar />
    <Navbar />
    <HeroSection />
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <AboutSection />
      <ServicesSection />
      <SindicoSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </Suspense>
    <WhatsAppFloat />
  </div>
);

export default Index;
