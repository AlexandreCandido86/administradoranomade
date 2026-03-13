import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent, useUpsertContent, useSiteImages, useUpsertImage } from "@/hooks/useSiteContent";
import { LogOut, Save, Image, FileText, Loader2, Palette, Plus, Trash2, Edit2, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { siteDefaults } from "@/data/siteDefaults";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const sections = [
  { id: "geral", label: "⚙️ Geral (Logo e Nome)", fields: [
    { key: "site_name", label: "Nome do site", type: "text" },
  ], images: [{ key: "logo", label: "Logotipo do site" }] },
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
    { key: "service_1_title", label: "Serviço 1 - Título", type: "text" },
    { key: "service_1_desc", label: "Serviço 1 - Descrição", type: "textarea" },
    { key: "service_1_title_detail", label: "Serviço 1 - Detalhe extra", type: "textarea" },
    { key: "service_2_title", label: "Serviço 2 - Título", type: "text" },
    { key: "service_2_desc", label: "Serviço 2 - Descrição", type: "textarea" },
    { key: "service_2_title_detail", label: "Serviço 2 - Detalhe extra", type: "textarea" },
    { key: "service_3_title", label: "Serviço 3 - Título", type: "text" },
    { key: "service_3_desc", label: "Serviço 3 - Descrição", type: "textarea" },
    { key: "service_3_title_detail", label: "Serviço 3 - Detalhe extra", type: "textarea" },
    { key: "service_4_title", label: "Serviço 4 - Título", type: "text" },
    { key: "service_4_desc", label: "Serviço 4 - Descrição", type: "textarea" },
    { key: "service_4_title_detail", label: "Serviço 4 - Detalhe extra", type: "textarea" },
    { key: "service_5_title", label: "Serviço 5 - Título", type: "text" },
    { key: "service_5_desc", label: "Serviço 5 - Descrição", type: "textarea" },
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
    { key: "testimonial_1_visible", label: "Depoimento 1 - Visível", type: "toggle" },
    { key: "testimonial_1_text", label: "Depoimento 1 - Texto", type: "textarea" },
    { key: "testimonial_1_name", label: "Depoimento 1 - Nome", type: "text" },
    { key: "testimonial_1_role", label: "Depoimento 1 - Cargo", type: "text" },
    { key: "testimonial_2_visible", label: "Depoimento 2 - Visível", type: "toggle" },
    { key: "testimonial_2_text", label: "Depoimento 2 - Texto", type: "textarea" },
    { key: "testimonial_2_name", label: "Depoimento 2 - Nome", type: "text" },
    { key: "testimonial_2_role", label: "Depoimento 2 - Cargo", type: "text" },
    { key: "testimonial_3_visible", label: "Depoimento 3 - Visível", type: "toggle" },
    { key: "testimonial_3_text", label: "Depoimento 3 - Texto", type: "textarea" },
    { key: "testimonial_3_name", label: "Depoimento 3 - Nome", type: "text" },
    { key: "testimonial_3_role", label: "Depoimento 3 - Cargo", type: "text" },
  ], images: [] },
  { id: "blog", label: "📝 Blog (Posts)", fields: [], images: [] },
  { id: "blog_page", label: "Página Blog (Textos)", fields: [
    { key: "title", label: "Título", type: "text" },
    { key: "intro", label: "Introdução", type: "textarea" },
  ], images: [] },
  { id: "contact", label: "Contato (Home)", fields: [
    { key: "label", label: "Label", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "phone", label: "Telefone", type: "text" },
    { key: "email", label: "E-mail", type: "text" },
    { key: "address", label: "Endereço", type: "text" },
    { key: "whatsapp", label: "WhatsApp (número com DDD)", type: "text" },
  ], images: [] },
  { id: "contato_page", label: "Página Contato", fields: [
    { key: "intro", label: "Introdução da página", type: "textarea" },
    { key: "hours", label: "Horário de atendimento", type: "text" },
  ], images: [] },
  { id: "topbar", label: "📌 Barra Superior", fields: [
    { key: "phone", label: "Telefone", type: "text" },
    { key: "email", label: "E-mail", type: "text" },
    { key: "facebook_visible", label: "Facebook - Visível", type: "toggle" },
    { key: "facebook_url", label: "Facebook - URL", type: "text" },
    { key: "instagram_visible", label: "Instagram - Visível", type: "toggle" },
    { key: "instagram_url", label: "Instagram - URL", type: "text" },
    { key: "linkedin_visible", label: "LinkedIn - Visível", type: "toggle" },
    { key: "linkedin_url", label: "LinkedIn - URL", type: "text" },
    { key: "youtube_visible", label: "YouTube - Visível", type: "toggle" },
    { key: "youtube_url", label: "YouTube - URL", type: "text" },
  ], images: [] },
  { id: "footer", label: "Rodapé", fields: [
    { key: "description", label: "Descrição", type: "textarea" },
    { key: "phone", label: "Telefone", type: "text" },
    { key: "email", label: "E-mail", type: "text" },
    { key: "address", label: "Endereço", type: "text" },
    { key: "service_1", label: "Serviço 1 (lista)", type: "text" },
    { key: "service_2", label: "Serviço 2 (lista)", type: "text" },
    { key: "service_3", label: "Serviço 3 (lista)", type: "text" },
    { key: "service_4", label: "Serviço 4 (lista)", type: "text" },
    { key: "copyright", label: "Texto de copyright", type: "text" },
  ], images: [] },
  { id: "colors", label: "🎨 Cores do Site", fields: [
    { key: "primary", label: "Cor Principal (dourado/destaque)", type: "color" },
    { key: "background", label: "Fundo do site", type: "color" },
    { key: "card", label: "Fundo dos cards", type: "color" },
    { key: "foreground", label: "Cor do texto principal", type: "color" },
    { key: "muted_foreground", label: "Cor do texto secundário", type: "color" },
    { key: "accent", label: "Cor de acento", type: "color" },
    { key: "border", label: "Cor das bordas", type: "color" },
  ], images: [] },
];

function hslToHex(hsl: string): string {
  const parts = hsl.trim().split(/\s+/);
  if (parts.length < 3) return "#c8a000";
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize form values: DB values take priority, then defaults
  if (contentData && !initialized) {
    const vals: Record<string, string> = {};
    // First, populate with defaults
    for (const section of sections) {
      for (const field of section.fields) {
        const defaultVal = siteDefaults[section.id]?.[field.key] ?? "";
        vals[`${section.id}__${field.key}`] = defaultVal;
      }
    }
    // Then override with DB values
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
  const isBlogSection = activeSection === "blog";
  const isColorSection = activeSection === "colors";

  const getDefault = (sectionId: string, key: string) => {
    return siteDefaults[sectionId]?.[key] ?? "";
  };

  const getValue = (sectionId: string, key: string) => {
    return formValues[`${sectionId}__${key}`] ?? "";
  };

  const setValue = (sectionId: string, key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [`${sectionId}__${key}`]: value }));
  };

  const handleSave = async () => {
    try {
      const promises = currentSection.fields.map((field) => {
        const value = getValue(activeSection, field.key) || getDefault(activeSection, field.key);
        return upsertContent.mutateAsync({
          section: activeSection,
          key: field.key,
          value,
        });
      });
      await Promise.all(promises);
      toast({ title: "Salvo!", description: "Conteúdo atualizado com sucesso." });
    } catch (err: any) {
      toast({ title: "Erro ao salvar", description: err?.message || "Não foi possível salvar.", variant: "destructive" });
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
      <header className="bg-card border-b border-border px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden text-foreground mr-1" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm">N</div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-foreground">Painel Admin</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:inline">Ver site</a>
          <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`
          fixed md:static z-40 top-0 left-0 h-full md:h-auto
          w-64 min-h-[calc(100vh-73px)] bg-card border-r border-border p-4 overflow-y-auto
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}>
          <div className="flex items-center justify-between md:hidden mb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Seções</p>
            <button onClick={() => setSidebarOpen(false)} className="text-foreground"><X className="w-4 h-4" /></button>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold hidden md:block">Seções do Site</p>
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setInitialized(false); setSidebarOpen(false); }}
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

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-3xl">
            {isBlogSection ? (
              <BlogManager />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    {isColorSection ? <Palette className="w-6 h-6 text-primary" /> : <FileText className="w-6 h-6 text-primary" />}
                    {currentSection.label}
                  </h2>
                  <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-gold-dark gap-2" disabled={upsertContent.isPending}>
                    {upsertContent.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isColorSection ? "Salvar Cores" : "Salvar Textos"}
                  </Button>
                </div>

                {isColorSection && (
                  <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground">
                      Altere as cores do site usando os seletores abaixo. As mudanças serão aplicadas após salvar e recarregar a página.
                    </p>
                  </div>
                )}

                {contentLoading ? (
                  <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : (
                  <div className="space-y-6">
                    {currentSection.fields.map((field) => {
                      const defaultVal = getDefault(activeSection, field.key);
                      const currentVal = getValue(activeSection, field.key);

                      if (field.type === "color") {
                        const hslVal = currentVal || defaultVal;
                        const hexVal = hslToHex(hslVal);
                        return (
                          <div key={field.key} className="space-y-2">
                            <Label className="text-foreground">{field.label}</Label>
                            <div className="flex items-center gap-4">
                              <input
                                type="color"
                                value={hexVal}
                                onChange={(e) => setValue(activeSection, field.key, hexToHsl(e.target.value))}
                                className="w-16 h-10 rounded cursor-pointer border border-border"
                              />
                              <Input
                                value={currentVal || defaultVal}
                                onChange={(e) => setValue(activeSection, field.key, e.target.value)}
                                className="bg-muted/50 font-mono text-sm"
                                placeholder={defaultVal}
                              />
                              <div
                                className="w-10 h-10 rounded border border-border flex-shrink-0"
                                style={{ backgroundColor: `hsl(${currentVal || defaultVal})` }}
                              />
                            </div>
                          </div>
                        );
                      }

                      if (field.type === "toggle") {
                        const isOn = (currentVal || defaultVal || "true") !== "false";
                        return (
                          <div key={field.key} className="flex items-center justify-between py-3 px-4 bg-muted/30 border border-border rounded-lg">
                            <Label className="text-foreground font-medium">{field.label}</Label>
                            <button
                              type="button"
                              onClick={() => setValue(activeSection, field.key, isOn ? "false" : "true")}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isOn ? "bg-primary" : "bg-muted"}`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOn ? "translate-x-6" : "translate-x-1"}`} />
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div key={field.key} className="space-y-2">
                          <Label className="text-foreground">{field.label}</Label>
                          {field.type === "textarea" ? (
                            <Textarea
                              value={currentVal}
                              onChange={(e) => setValue(activeSection, field.key, e.target.value)}
                              rows={3}
                              className="bg-muted/50"
                              placeholder={defaultVal}
                            />
                          ) : (
                            <Input
                              value={currentVal}
                              onChange={(e) => setValue(activeSection, field.key, e.target.value)}
                              className="bg-muted/50"
                              placeholder={defaultVal}
                            />
                          )}
                        </div>
                      );
                    })}

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
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── Blog Manager Component ───
function BlogManager() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", description: "", content: "", published_at: "", image_url: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = form.image_url;

      if (imageFile) {
        const filePath = `blog/${Date.now()}-${imageFile.name}`;
        const { error: upErr } = await supabase.storage.from("site-images").upload(filePath, imageFile, { upsert: true });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      const payload = {
        title: form.title,
        description: form.description,
        content: form.content,
        image_url: imageUrl,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : new Date().toISOString(),
      };

      if (editing) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog_posts"] });
      toast({ title: editing ? "Post atualizado!" : "Post criado!" });
      resetForm();
    },
    onError: (err: any) => {
      toast({ title: "Erro", description: err?.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog_posts"] });
      toast({ title: "Post excluído!" });
    },
  });

  const resetForm = () => {
    setEditing(null);
    setForm({ title: "", description: "", content: "", published_at: "", image_url: "" });
    setImageFile(null);
  };

  const startEdit = (post: any) => {
    setEditing(post);
    setForm({
      title: post.title,
      description: post.description,
      content: (post as any).content || "",
      published_at: post.published_at ? post.published_at.slice(0, 16) : "",
      image_url: post.image_url || "",
    });
    setImageFile(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-primary" />
        📝 Gerenciar Posts do Blog
      </h2>

      {/* Form */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
        <h3 className="font-semibold text-foreground">{editing ? "Editar Post" : "Novo Post"}</h3>
        <div className="space-y-2">
          <Label className="text-foreground">Título</Label>
          <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="bg-muted/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-foreground">Descrição (resumo exibido no card)</Label>
          <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="bg-muted/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-foreground">Conteúdo completo do post</Label>
          <Textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={10} className="bg-muted/50" placeholder="Escreva o conteúdo completo do post aqui..." />
        </div>
        <div className="space-y-2">
          <Label className="text-foreground">Data de publicação</Label>
          <Input type="datetime-local" value={form.published_at} onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))} className="bg-muted/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-foreground">Imagem do post</Label>
          {(form.image_url || imageFile) && (
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : form.image_url}
              alt="Preview"
              className="w-full max-h-48 object-cover rounded-lg border border-border mb-2"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
            className="bg-muted/50"
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending} className="bg-primary text-primary-foreground hover:bg-gold-dark gap-2">
            {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {editing ? "Salvar Alterações" : "Criar Post"}
          </Button>
          {editing && (
            <Button variant="outline" onClick={resetForm}>Cancelar</Button>
          )}
        </div>
      </div>

      {/* List */}
      <h3 className="font-semibold text-foreground mb-4">Posts existentes ({posts?.length ?? 0})</h3>
      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : posts?.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhum post cadastrado.</p>
      ) : (
        <div className="space-y-3">
          {posts?.map((post) => (
            <div key={post.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
              {post.image_url && (
                <img src={post.image_url} alt={post.title} className="w-16 h-16 rounded object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{post.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => startEdit(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate(post.id)} className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
