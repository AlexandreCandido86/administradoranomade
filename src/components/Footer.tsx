import { useContentValue } from "@/hooks/useSiteContent";

const Footer = () => {
  const description = useContentValue("footer", "description", "Administração condominial de alto padrão. Gestão profissional, transparente e humanizada.");
  const phone = useContentValue("footer", "phone", "(11) 99999-9999");
  const email = useContentValue("footer", "email", "contato@nomade.com.br");
  const address = useContentValue("footer", "address", "São Paulo, SP");

  return (
    <footer className="bg-dark-surface border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm">N</div>
              <span className="text-lg font-bold text-foreground">NÔMADE</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#inicio" className="hover:text-primary transition-colors">Início</a></li>
              <li><a href="#quem-somos" className="hover:text-primary transition-colors">Quem Somos</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Serviços</a></li>
              <li><a href="#sindicos" className="hover:text-primary transition-colors">Síndicos</a></li>
              <li><a href="#contato" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Gestão Financeira</li>
              <li>Gestão Administrativa</li>
              <li>Assessoria ao Síndico</li>
              <li>Apoio em Assembleias</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{phone}</li>
              <li>{email}</li>
              <li>{address}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © 2024 Nômade Administradora. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
