import { lazy, Suspense } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load sections below the fold
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SindicoSection = lazy(() => import("@/components/SindicoSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => (
  <div className="min-h-screen bg-background">
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
  </div>
);

export default Index;
