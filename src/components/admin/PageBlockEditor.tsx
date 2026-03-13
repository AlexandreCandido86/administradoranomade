import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus, Trash2, ArrowUp, ArrowDown, Type, Image, Video, Share2, Palette,
  GripVertical, ChevronDown, ChevronUp, MousePointerClick,
} from "lucide-react";

export interface ContentBlock {
  id: string;
  type: "text" | "image" | "video" | "social" | "divider" | "button";
  content: string;
  bgColor?: string;
  textColor?: string;
  align?: "left" | "center" | "right";
  buttonUrl?: string;
  imageFile?: File;
}

interface Props {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const BLOCK_TYPES = [
  { type: "text" as const, icon: Type, label: "Texto" },
  { type: "image" as const, icon: Image, label: "Imagem" },
  { type: "video" as const, icon: Video, label: "Vídeo" },
  { type: "social" as const, icon: Share2, label: "Rede Social" },
  { type: "divider" as const, icon: GripVertical, label: "Divisor" },
  { type: "button" as const, icon: MousePointerClick, label: "Botão" },
];

export default function PageBlockEditor({ blocks, onChange }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: uid(),
      type,
      content: "",
      bgColor: "",
      textColor: "",
      align: "left",
    };
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next >= blocks.length) return;
    const arr = [...blocks];
    [arr[index], arr[next]] = [arr[next], arr[index]];
    onChange(arr);
  };

  const toggleCollapse = (id: string) => {
    setCollapsed((c) => ({ ...c, [id]: !c[id] }));
  };

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    const isCollapsed = collapsed[block.id];
    const meta = BLOCK_TYPES.find((t) => t.type === block.type);
    const Icon = meta?.icon || Type;

    return (
      <div key={block.id} className="bg-muted/30 border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 cursor-pointer" onClick={() => toggleCollapse(block.id)}>
          <Icon className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-sm font-medium text-foreground flex-1 truncate">
            {meta?.label} {block.content ? `- ${block.content.slice(0, 40)}...` : ""}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveBlock(index, -1)} disabled={index === 0}>
              <ArrowUp className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1}>
              <ArrowDown className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive" onClick={() => removeBlock(block.id)}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
          {isCollapsed ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronUp className="w-4 h-4 text-muted-foreground" />}
        </div>

        {/* Body */}
        {!isCollapsed && (
          <div className="p-3 md:p-4 space-y-3">
            {block.type === "text" && (
              <div className="space-y-2">
                <Label className="text-foreground text-xs">Conteúdo de texto (suporta HTML)</Label>
                <Textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  rows={5}
                  className="bg-background text-sm"
                  placeholder="<h2>Título</h2><p>Seu conteúdo aqui...</p>"
                />
              </div>
            )}

            {block.type === "image" && (
              <div className="space-y-2">
                <Label className="text-foreground text-xs">URL da imagem ou faça upload</Label>
                <Input
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  className="bg-background text-sm"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateBlock(block.id, { imageFile: file, content: URL.createObjectURL(file) });
                    }
                  }}
                  className="bg-background text-sm"
                />
                {block.content && (
                  <img src={block.content} alt="Preview" className="w-full max-h-40 object-cover rounded border border-border" />
                )}
              </div>
            )}

            {block.type === "video" && (
              <div className="space-y-2">
                <Label className="text-foreground text-xs">URL do vídeo (YouTube, Vimeo, etc.)</Label>
                <Input
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  className="bg-background text-sm"
                  placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
                />
                <p className="text-xs text-muted-foreground">Cole a URL do YouTube, Vimeo ou qualquer vídeo embed.</p>
              </div>
            )}

            {block.type === "social" && (
              <div className="space-y-2">
                <Label className="text-foreground text-xs">Embed / Link da rede social</Label>
                <Textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  rows={3}
                  className="bg-background text-sm"
                  placeholder="Cole o código embed do Instagram, Facebook, Twitter, TikTok..."
                />
                <p className="text-xs text-muted-foreground">Cole o código embed (iframe) ou a URL do post.</p>
              </div>
            )}

            {block.type === "divider" && (
              <p className="text-xs text-muted-foreground">Linha divisória entre seções.</p>
            )}

            {block.type === "button" && (
              <div className="space-y-2">
                <Label className="text-foreground text-xs">Texto do botão</Label>
                <Input
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  className="bg-background text-sm"
                  placeholder="Clique aqui"
                />
                <Label className="text-foreground text-xs">Link do botão (URL)</Label>
                <Input
                  value={block.buttonUrl || ""}
                  onChange={(e) => updateBlock(block.id, { buttonUrl: e.target.value })}
                  className="bg-background text-sm"
                  placeholder="https://exemplo.com ou /pagina/slug"
                />
              </div>
            )}

            {/* Color & alignment options for text and divider */}
            {(block.type === "text" || block.type === "divider" || block.type === "image" || block.type === "button") && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border">
                <div className="space-y-1">
                  <Label className="text-foreground text-xs flex items-center gap-1">
                    <Palette className="w-3 h-3" /> Cor de fundo
                  </Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={block.bgColor || "#ffffff"}
                      onChange={(e) => updateBlock(block.id, { bgColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border border-border"
                    />
                    <Input
                      value={block.bgColor || ""}
                      onChange={(e) => updateBlock(block.id, { bgColor: e.target.value })}
                      placeholder="Transparente"
                      className="bg-background text-xs h-8"
                    />
                  </div>
                </div>
                {block.type === "text" && (
                  <div className="space-y-1">
                    <Label className="text-foreground text-xs">Cor do texto</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={block.textColor || "#000000"}
                        onChange={(e) => updateBlock(block.id, { textColor: e.target.value })}
                        className="w-8 h-8 rounded cursor-pointer border border-border"
                      />
                      <Input
                        value={block.textColor || ""}
                        onChange={(e) => updateBlock(block.id, { textColor: e.target.value })}
                        placeholder="Padrão"
                        className="bg-background text-xs h-8"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <Label className="text-foreground text-xs">Alinhamento</Label>
                  <div className="flex gap-1">
                    {(["left", "center", "right"] as const).map((a) => (
                      <Button
                        key={a}
                        variant={block.align === a ? "default" : "outline"}
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => updateBlock(block.id, { align: a })}
                      >
                        {a === "left" ? "Esq" : a === "center" ? "Centro" : "Dir"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Label className="text-foreground font-medium">Conteúdo da página (blocos)</Label>

      {blocks.length === 0 && (
        <p className="text-sm text-muted-foreground py-4 text-center border border-dashed border-border rounded-lg">
          Nenhum bloco adicionado. Use os botões abaixo para montar sua página.
        </p>
      )}

      <div className="space-y-3">
        {blocks.map((block, i) => renderBlockEditor(block, i))}
      </div>

      {/* Add block buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        {BLOCK_TYPES.map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => addBlock(type)}
            className="gap-1.5 text-xs h-8"
          >
            <Plus className="w-3 h-3" />
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
