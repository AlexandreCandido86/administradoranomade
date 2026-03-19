import { useState } from "react";
import { Menu, X, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useContentValue, useImageValue, useSiteImages } from "@/hooks/useSiteContent";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const defaultNavItems = [
  { label: "Início", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Síndicos", href: "/sindicos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const whatsapp = useContentValue("contact", "whatsapp", "(11) 99999-9999");
  const whatsappUrl = `https://wa.me/55${whatsapp.replace(/\D/g, "")}`;
  const siteName = useContentValue("geral", "site_name", "NÔMADE");
  const { data: imageData, isLoading: logoLoading } = useSiteImages("geral");
  const logoUrl = logoLoading ? undefined : (imageData?.find((d: any) => d.key === "logo")?.image_url ?? "");

  const { data: menuItems } = useQuery({
    queryKey: ["menu_items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items" as any)
        .select("*")
        .eq("visible", true)
        .order("position", { ascending: true });
      if (error) throw error;
      return data as any[];
    },
  });

  // Use dynamic menu if items exist, otherwise fallback to default
  const navItems = menuItems && menuItems.length > 0
    ? menuItems.map((item: any) => ({ label: item.label, href: item.url || "/" }))
    : defaultNavItems;

  const isExternal = (href: string) => href.startsWith("http");

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <Link to="/" className="flex items-center gap-2 min-h-[40px]">
          {logoUrl === undefined ? (
            <div className="h-10 w-24" />
          ) : logoUrl ? (
            <img src={logoUrl} alt={siteName} className="h-16 md:h-20 lg:h-24 w-auto object-contain max-w-[200px] lg:max-w-[260px]" />
          ) : (
            <>
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm">N</div>
              <span className="text-lg font-bold text-foreground tracking-wide">{siteName}</span>
            </>
          )}
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            if (isExternal(item.href)) {
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-primary text-foreground">
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/admin/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <User className="w-4 h-4" />
            Área Admin
          </Link>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80 font-semibold gap-2 whitespace-nowrap text-xs xl:text-sm">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              CONDOMÍNIO ONLINE
            </a>
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border px-4 pb-4">
          {navItems.map((item) => {
            if (isExternal(item.href)) {
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="block py-3 text-sm font-medium text-foreground hover:text-primary border-b border-border"
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.label} to={item.href} className="block py-3 text-sm font-medium text-foreground hover:text-primary border-b border-border" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            );
          })}
          <Link to="/admin/login" className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border" onClick={() => setMobileOpen(false)}>
            Área Admin
          </Link>
          <Button asChild className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/80 font-semibold gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              CONDOMÍNIO ONLINE
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
