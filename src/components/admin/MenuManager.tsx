import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit2, Save, Loader2, Menu as MenuIcon, GripVertical, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";

export default function MenuManager() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ label: "", url: "", page_id: "", visible: true });

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menu_items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items" as any)
        .select("*")
        .order("position", { ascending: true });
      if (error) throw error;
      return data as any[];
    },
  });

  const { data: pages } = useQuery({
    queryKey: ["custom_pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_pages" as any)
        .select("id, title, slug")
        .order("title");
      if (error) throw error;
      return data as any[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const url = form.page_id
        ? `/pagina/${pages?.find((p: any) => p.id === form.page_id)?.slug || ""}`
        : form.url;

      const payload = {
        label: form.label,
        url,
        page_id: form.page_id || null,
        visible: form.visible,
        position: editing ? editing.position : (menuItems?.length ?? 0),
      };

      if (editing) {
        const { error } = await supabase.from("menu_items" as any).update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("menu_items" as any).insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menu_items"] });
      toast({ title: editing ? "Item atualizado!" : "Item criado!" });
      resetForm();
    },
    onError: (err: any) => toast({ title: "Erro", description: err?.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("menu_items" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menu_items"] });
      toast({ title: "Item excluído!" });
    },
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: "up" | "down" }) => {
      if (!menuItems) return;
      const idx = menuItems.findIndex((i: any) => i.id === id);
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= menuItems.length) return;

      const current = menuItems[idx];
      const swap = menuItems[swapIdx];

      await Promise.all([
        supabase.from("menu_items" as any).update({ position: swap.position }).eq("id", current.id),
        supabase.from("menu_items" as any).update({ position: current.position }).eq("id", swap.id),
      ]);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["menu_items"] }),
  });

  const resetForm = () => {
    setEditing(null);
    setForm({ label: "", url: "", page_id: "", visible: true });
  };

  const startEdit = (item: any) => {
    setEditing(item);
    setForm({
      label: item.label,
      url: item.url || "",
      page_id: item.page_id || "",
      visible: item.visible ?? true,
    });
  };

  // Built-in routes for quick selection
  const builtInRoutes = [
    { label: "Início", url: "/" },
    { label: "Quem Somos", url: "/quem-somos" },
    { label: "Serviços", url: "/servicos" },
    { label: "Síndicos", url: "/sindicos" },
    { label: "Blog", url: "/blog" },
    { label: "Contato", url: "/contato" },
  ];

  const seedDefaultsMutation = useMutation({
    mutationFn: async () => {
      const items = builtInRoutes.map((r, i) => ({
        label: r.label,
        url: r.url,
        position: i,
        visible: true,
      }));
      const { error } = await supabase.from("menu_items" as any).insert(items);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menu_items"] });
      toast({ title: "Menu padrão carregado!" });
    },
    onError: (err: any) => toast({ title: "Erro", description: err?.message, variant: "destructive" }),
  });

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
        <MenuIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        🗂️ Gerenciar Menu
      </h2>

      {(!menuItems || menuItems.length === 0) && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-sm text-foreground flex-1">
            ⚡ Carregue os itens padrão do menu para começar a personalizar sem perder os links existentes.
          </p>
          <Button onClick={() => seedDefaultsMutation.mutate()} disabled={seedDefaultsMutation.isPending} className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2 whitespace-nowrap">
            {seedDefaultsMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Carregar Menu Padrão
          </Button>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8 space-y-4">
        <h3 className="font-semibold text-foreground">{editing ? "Editar Item" : "Novo Item do Menu"}</h3>

        <div className="space-y-2">
          <Label className="text-foreground">Nome do item</Label>
          <Input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className="bg-muted/50" placeholder="Ex: Quem Somos" />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Tipo de link</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Página criada</Label>
              <select
                value={form.page_id}
                onChange={(e) => setForm((f) => ({ ...f, page_id: e.target.value, url: "" }))}
                className="w-full h-10 rounded-md border border-border bg-muted/50 px-3 text-sm text-foreground"
              >
                <option value="">— Nenhuma página —</option>
                {pages?.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Ou rota/URL manual</Label>
              <select
                value={!form.page_id ? form.url : ""}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value, page_id: "" }))}
                className="w-full h-10 rounded-md border border-border bg-muted/50 px-3 text-sm text-foreground"
                disabled={!!form.page_id}
              >
                <option value="">— Selecionar rota —</option>
                {builtInRoutes.map((r) => (
                  <option key={r.url} value={r.url}>{r.label} ({r.url})</option>
                ))}
              </select>
            </div>
          </div>
          {!form.page_id && (
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Ou digite uma URL customizada</Label>
              <Input
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                className="bg-muted/50"
                placeholder="Ex: /minha-pagina ou https://..."
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-2 px-4 bg-muted/30 border border-border rounded-lg">
          <Label className="text-foreground font-medium">Visível no menu</Label>
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, visible: !f.visible }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.visible ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.visible ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => saveMutation.mutate()} disabled={!form.label || saveMutation.isPending} className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2">
            {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {editing ? "Salvar" : "Adicionar"}
          </Button>
          {editing && <Button variant="outline" onClick={resetForm}>Cancelar</Button>}
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-4">Itens do menu ({menuItems?.length ?? 0})</h3>
      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : menuItems?.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhum item no menu. O menu padrão será exibido.</p>
      ) : (
        <div className="space-y-2">
          {menuItems?.map((item: any, idx: number) => (
            <div key={item.id} className="bg-card border border-border rounded-lg p-3 md:p-4 flex items-center gap-2 md:gap-4">
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <button onClick={() => moveMutation.mutate({ id: item.id, direction: "up" })} disabled={idx === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => moveMutation.mutate({ id: item.id, direction: "down" })} disabled={idx === (menuItems?.length ?? 0) - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {item.visible ? <Eye className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                  <p className="font-medium text-foreground truncate text-sm md:text-base">{item.label}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate">{item.url}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => startEdit(item)}><Edit2 className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate(item.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 Se nenhum item for adicionado ao menu, o site exibirá o menu padrão. Adicione itens para personalizar a navegação.
        </p>
      </div>
    </div>
  );
}
