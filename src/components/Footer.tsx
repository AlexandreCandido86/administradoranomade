import { Link } from "react-router-dom";
import { useContentValue, useImageValue } from "@/hooks/useSiteContent";

const Footer = () => {
  const description = useContentValue("footer", "description", "Administração condominial de alto padrão. Gestão profissional, transparente e humanizada.");
  const phone = useContentValue("footer", "phone", "(11) 99999-9999");
  const email = useContentValue("footer", "email", "contato@nomade.com.br");
  const address = useContentValue("footer", "address", "São Paulo, SP");
  const service1 = useContentValue("footer", "service_1", "Gestão Financeira");
  const service2 = useContentValue("footer", "service_2", "Gestão Administrativa");
  const service3 = useContentValue("footer", "service_3", "Assessoria ao Síndico");
  const service4 = useContentValue("footer", "service_4", "Apoio em Assembleias");
  const copyright = useContentValue("footer", "copyright", "© 2024 Nômade Administradora. Todos os direitos reservados.");
  const siteName = useContentValue("geral", "site_name", "NÔMADE");
  const logoUrl = useImageValue("geral", "logo", "");

  return (
    <footer className="bg-dark-surface border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-8 w-auto object-contain" />
              ) : (
                <>
                  <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm">N</div>
                  <span className="text-lg font-bold text-foreground">{siteName}</span>
                </>
              )}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><Link to="/quem-somos" className="hover:text-primary transition-colors">Quem Somos</Link></li>
              <li><Link to="/servicos" className="hover:text-primary transition-colors">Serviços</Link></li>
              <li><Link to="/sindicos" className="hover:text-primary transition-colors">Síndicos</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{service1}</li>
              <li>{service2}</li>
              <li>{service3}</li>
              <li>{service4}</li>
            </ul>
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground break-all">
              <li>{phone}</li>
              <li>{email}</li>
              <li className="break-words">{address}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
