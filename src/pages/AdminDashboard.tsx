import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent, useUpsertContent, useSiteImages, useUpsertImage } from "@/hooks/useSiteContent";
import { LogOut, Save, Image, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sections = [
  { id: "hero", label: "Hero (Banner Principal)", fields: [
    { key: "label", label: "Label superior", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "title_highlight", label: "Texto em destaque", type: "text" },
    { key: "subtitle", label: "Subtítulo", type: "textarea" },
    { key: "cta_primary", label: "Botão principal", type: "text" },
    { key: "cta_secondary", label: "Botão secundário", type: "text" },
  ], images: [{ key: "bg", label: "Imagem de fundo" }] },
  { id: "about", label: "Quem Somos (Home)", fields: [
    { key: "label", label: "Label", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "description", label: "Descrição", type: "textarea" },
    { key: "feature_1", label: "Diferencial 1", type: "text" },
    { key: "feature_2", label: "Diferencial 2", type: "text" },
    { key: "feature_3", label: "Diferencial 3", type: "text" },
    { key: "feature_4", label: "Diferencial 4", type: "text" },
    { key: "stat_1_number", label: "Estatística 1 - Número", type: "text" },
    { key: "stat_1_label", label: "Estatística 1 - Label", type: "text" },
    { key: "stat_2_number", label: "Estatística 2 - Número", type: "text" },
    { key: "stat_2_label", label: "Estatística 2 - Label", type: "text" },
    { key: "stat_3_number", label: "Estatística 3 - Número", type: "text" },
    { key: "stat_3_label", label: "Estatística 3 - Label", type: "text" },
    { key: "stat_4_number", label: "Estatística 4 - Número", type: "text" },
    { key: "stat_4_label", label: "Estatística 4 - Label", type: "text" },
  ], images: [{ key: "main", label: "Imagem principal" }] },
  { id: "about_page", label: "Página Quem Somos", fields: [
    { key: "intro", label: "Introdução da página", type: "textarea" },
    { key: "mission", label: "Missão", type: "textarea" },
    { key: "vision", label: "Visão", type: "textarea" },
    { key: "values", label: "Valores", type: "textarea" },
  ], images: [] },
  { id: "services", label: "Serviços (Home)", fields: [
    { key: "label", label: "Label", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "service_1_title", label: "Serviço 1 - Título", type: "text" },
    { key: "service_1_desc", label: "Serviço 1 - Descrição", type: "textarea" },
    { key: "service_2_title", label: "Serviço 2 - Título", type: "text" },
    { key: "service_2_desc", label: "Serviço 2 - Descrição", type: "textarea" },
    { key: "service_3_title", label: "Serviço 3 - Título", type: "text" },
    { key: "service_3_desc", label: "Serviço 3 - Descrição", type: "textarea" },
    { key: "service_4_title", label: "Serviço 4 - Título", type: "text" },
    { key: "service_4_desc", label: "Serviço 4 - Descrição", type: "textarea" },
    { key: "service_5_title", label: "Serviço 5 - Título", type: "text" },
    { key: "service_5_desc", label: "Serviço 5 - Descrição", type: "textarea" },
    { key: "cta_title", label: "CTA - Título", type: "text" },
    { key: "cta_desc", label: "CTA - Descrição", type: "textarea" },
  ], images: [] },
  { id: "services_page", label: "Página Serviços", fields: [
    { key: "intro", label: "Introdução da página", type: "textarea" },
    { key: "service_1_title_detail", label: "Serviço 1 - Detalhe extra", type: "textarea" },
    { key: "service_2_title_detail", label: "Serviço 2 - Detalhe extra", type: "textarea" },
    { key: "service_3_title_detail", label: "Serviço 3 - Detalhe extra", type: "textarea" },
    { key: "service_4_title_detail", label: "Serviço 4 - Detalhe extra", type: "textarea" },
    { key: "service_5_title_detail", label: "Serviço 5 - Detalhe extra", type: "textarea" },
  ], images: [] },
  { id: "sindico", label: "Síndicos (Home)", fields: [
    { key: "label", label: "Label", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "description", label: "Descrição", type: "textarea" },
    { key: "card_subtitle", label: "Subtítulo do card", type: "text" },
    { key: "card_text", label: "Texto do card", type: "text" },
  ], images: [{ key: "main", label: "Imagem do síndico" }] },
  { id: "sindicos_page", label: "Página Síndicos", fields: [
    { key: "intro", label: "Introdução da página", type: "textarea" },
    { key: "detail", label: "Texto detalhado", type: "textarea" },
  ], images: [] },
  { id: "testimonials", label: "Depoimentos", fields: [
    { key: "label", label: "Label", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "testimonial_1_text", label: "Depoimento 1 - Texto", type: "textarea" },
    { key: "testimonial_1_name", label: "Depoimento 1 - Nome", type: "text" },
    { key: "testimonial_1_role", label: "Depoimento 1 - Cargo", type: "text" },
    { key: "testimonial_2_text", label: "Depoimento 2 - Texto", type: "textarea" },
    { key: "testimonial_2_name", label: "Depoimento 2 - Nome", type: "text" },
    { key: "testimonial_2_role", label: "Depoimento 2 - Cargo", type: "text" },
    { key: "testimonial_3_text", label: "Depoimento 3 - Texto", type: "textarea" },
    { key: "testimonial_3_name", label: "Depoimento 3 - Nome", type: "text" },
    { key: "testimonial_3_role", label: "Depoimento 3 - Cargo", type: "text" },
  ], images: [] },
  { id: "blog_page", label: "Página Blog", fields: [
    { key: "title", label: "Título", type: "text" },
    { key: "intro", label: "Introdução", type: "textarea" },
    { key: "post_1_title", label: "Post 1 - Título", type: "text" },
    { key: "post_1_desc", label: "Post 1 - Descrição", type: "textarea" },
    { key: "post_1_date", label: "Post 1 - Data", type: "text" },
    { key: "post_2_title", label: "Post 2 - Título", type: "text" },
    { key: "post_2_desc", label: "Post 2 - Descrição", type: "textarea" },
    { key: "post_2_date", label: "Post 2 - Data", type: "text" },
    { key: "post_3_title", label: "Post 3 - Título", type: "text" },
    { key: "post_3_desc", label: "Post 3 - Descrição", type: "textarea" },
    { key: "post_3_date", label: "Post 3 - Data", type: "text" },
  ], images: [] },
  { id: "contact", label: "Contato (Home)", fields: [
    { key: "label", label: "Label", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "phone", label: "Telefone", type: "text" },
    { key: "email", label: "E-mail", type: "text" },
    { key: "address", label: "Endereço", type: "text" },
    { key: "whatsapp", label: "WhatsApp", type: "text" },
  ], images: [] },
  { id: "contato_page", label: "Página Contato", fields: [
    { key: "intro", label: "Introdução da página", type: "textarea" },
    { key: "hours", label: "Horário de atendimento", type: "text" },
  ], images: [] },
  { id: "footer", label: "Rodapé", fields: [
    { key: "description", label: "Descrição", type: "textarea" },
    { key: "phone", label: "Telefone", type: "text" },
    { key: "email", label: "E-mail", type: "text" },
    { key: "address", label: "Endereço", type: "text" },
  ], images: [] },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("hero");
  const { data: contentData, isLoading: contentLoading } = useSiteContent();
  const { data: imagesData } = useSiteImages();
  const upsertContent = useUpsertContent();
  const upsertImage = useUpsertImage();
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);

  if (contentData && !initialized) {
    const vals: Record<string, string> = {};
    contentData.forEach((item) => {
      vals[`${item.section}__${item.key}`] = item.value;
    });
    setFormValues(vals);
    setInitialized(true);
  }

  if (authLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (!user) return <Navigate to="/admin/login" />;
  if (!isAdmin) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Acesso Negado</h1>
        <p className="text-muted-foreground mb-4">Você não tem permissão de administrador.</p>
        <Button onClick={signOut} variant="outline">Sair</Button>
      </div>
    </div>
  );

  const currentSection = sections.find((s) => s.id === activeSection)!;

  const getValue = (sectionId: string, key: string) => {
    return formValues[`${sectionId}__${key}`] ?? "";
  };

  const setValue = (sectionId: string, key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [`${sectionId}__${key}`]: value }));
  };

  const handleSave = async () => {
    try {
      const promises = currentSection.fields.map((field) =>
        upsertContent.mutateAsync({
          section: activeSection,
          key: field.key,
          value: getValue(activeSection, field.key),
        })
      );
      await Promise.all(promises);
      toast({ title: "Salvo!", description: "Conteúdo atualizado com sucesso." });
    } catch {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    }
  };

  const handleImageUpload = async (key: string, file: File) => {
    try {
      await upsertImage.mutateAsync({ section: activeSection, key, file });
      toast({ title: "Imagem atualizada!" });
    } catch {
      toast({ title: "Erro ao enviar imagem", variant: "destructive" });
    }
  };

  const getImageUrl = (sectionId: string, key: string) => {
    const item = imagesData?.find((d: any) => d.section === sectionId && d.key === key);
    return item?.image_url ?? "";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm">N</div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Painel Admin</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ver site</a>
          <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
            <LogOut className="w-4 h-4" /> Sair
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 min-h-[calc(100vh-73px)] bg-card border-r border-border p-4 overflow-y-auto">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Seções do Site</p>
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setInitialized(false); }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === s.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                {currentSection.label}
              </h2>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-gold-dark gap-2" disabled={upsertContent.isPending}>
                {upsertContent.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Salvar Textos
              </Button>
            </div>

            {contentLoading ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
            ) : (
              <div className="space-y-6">
                {currentSection.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label className="text-foreground">{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        value={getValue(activeSection, field.key)}
                        onChange={(e) => setValue(activeSection, field.key, e.target.value)}
                        rows={3}
                        className="bg-muted/50"
                      />
                    ) : (
                      <Input
                        value={getValue(activeSection, field.key)}
                        onChange={(e) => setValue(activeSection, field.key, e.target.value)}
                        className="bg-muted/50"
                      />
                    )}
                  </div>
                ))}

                {currentSection.images.length > 0 && (
                  <div className="border-t border-border pt-6 mt-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                      <Image className="w-5 h-5 text-primary" /> Imagens
                    </h3>
                    {currentSection.images.map((img) => (
                      <div key={img.key} className="space-y-3 mb-6">
                        <Label className="text-foreground">{img.label}</Label>
                        {getImageUrl(activeSection, img.key) && (
                          <img
                            src={getImageUrl(activeSection, img.key)}
                            alt={img.label}
                            className="w-full max-h-48 object-cover rounded-lg border border-border"
                          />
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(img.key, file);
                          }}
                          className="bg-muted/50"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
