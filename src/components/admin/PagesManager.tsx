import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit2, Save, Loader2, FileText, Eye, EyeOff } from "lucide-react";
import PageBlockEditor, { type ContentBlock } from "./PageBlockEditor";

export default function PagesManager() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", slug: "", image_url: "", published: true });
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: pages, isLoading } = useQuery({
    queryKey: ["custom_pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_pages" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });

  const generateSlug = (title: string) =>
    title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const uploadBlockImages = async (blockList: ContentBlock[]): Promise<ContentBlock[]> => {
    const result: ContentBlock[] = [];
    for (const block of blockList) {
      if (block.type === "image" && block.imageFile) {
        const filePath = `pages/${Date.now()}-${block.imageFile.name}`;
        const { error } = await supabase.storage.from("site-images").upload(filePath, block.imageFile, { upsert: true });
        if (error) throw error;
        const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(filePath);
        result.push({ ...block, content: urlData.publicUrl, imageFile: undefined });
      } else {
        result.push({ ...block, imageFile: undefined });
      }
    }
    return result;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = form.image_url;
      if (imageFile) {
        const filePath = `pages/${Date.now()}-${imageFile.name}`;
        const { error: upErr } = await supabase.storage.from("site-images").upload(filePath, imageFile, { upsert: true });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      const uploadedBlocks = await uploadBlockImages(blocks);
      const serializable = uploadedBlocks.map(({ imageFile: _, ...rest }) => rest);

      const slug = form.slug || generateSlug(form.title);
      const payload = {
        title: form.title,
        slug,
        content: JSON.stringify(serializable),
        image_url: imageUrl,
        published: form.published,
      };

      if (editing) {
        const { error } = await supabase.from("custom_pages" as any).update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("custom_pages" as any).insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["custom_pages"] });
      toast({ title: editing ? "Página atualizada!" : "Página criada!" });
      resetForm();
    },
    onError: (err: any) => toast({ title: "Erro", description: err?.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("custom_pages" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["custom_pages"] });
      toast({ title: "Página excluída!" });
    },
  });

  const resetForm = () => {
    setEditing(null);
    setForm({ title: "", slug: "", image_url: "", published: true });
    setBlocks([]);
    setImageFile(null);
  };

  const parseBlocks = (content: string): ContentBlock[] => {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    // Legacy plain text → single text block
    if (content) return [{ id: "legacy", type: "text", content, align: "left" }];
    return [];
  };

  const startEdit = (page: any) => {
    setEditing(page);
    setForm({
      title: page.title,
      slug: page.slug,
      image_url: page.image_url || "",
      published: page.published ?? true,
    });
    setBlocks(parseBlocks(page.content || ""));
    setImageFile(null);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        📄 Gerenciar Páginas
      </h2>

      <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8 space-y-4">
        <h3 className="font-semibold text-foreground">{editing ? "Editar Página" : "Nova Página"}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-foreground">Título</Label>
            <Input
              value={form.title}
              onChange={(e) => {
                setForm((f) => ({
                  ...f,
                  title: e.target.value,
                  slug: editing ? f.slug : generateSlug(e.target.value),
                }));
              }}
              className="bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Slug (URL)</Label>
            <Input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="bg-muted/50"
              placeholder="ex: minha-pagina"
            />
          </div>
        </div>

        {/* Block Editor */}
        <PageBlockEditor blocks={blocks} onChange={setBlocks} />

        <div className="space-y-2">
          <Label className="text-foreground">Imagem de capa (opcional)</Label>
          {(form.image_url || imageFile) && (
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : form.image_url}
              alt="Preview"
              className="w-full max-h-40 object-cover rounded-lg border border-border mb-2"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => { const file = e.target.files?.[0]; if (file) setImageFile(file); }}
            className="bg-muted/50"
          />
        </div>

        <div className="flex items-center justify-between py-2 px-4 bg-muted/30 border border-border rounded-lg">
          <Label className="text-foreground font-medium">Publicada</Label>
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.published ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending} className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2">
            {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {editing ? "Salvar" : "Criar Página"}
          </Button>
          {editing && <Button variant="outline" onClick={resetForm}>Cancelar</Button>}
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-4">Páginas existentes ({pages?.length ?? 0})</h3>
      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : pages?.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhuma página cadastrada.</p>
      ) : (
        <div className="space-y-3">
          {pages?.map((page: any) => (
            <div key={page.id} className="bg-card border border-border rounded-lg p-3 md:p-4 flex items-center gap-3 md:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {page.published ? <Eye className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                  <p className="font-medium text-foreground truncate text-sm md:text-base">{page.title}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">/{page.slug}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => startEdit(page)}><Edit2 className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate(page.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
