import { useParams, Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentBlock {
  id: string;
  type: "text" | "image" | "video" | "social" | "divider" | "button";
  content: string;
  bgColor?: string;
  textColor?: string;
  align?: "left" | "center" | "right";
  buttonUrl?: string;
}

const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&\s]+)/);
  return match?.[1] || null;
};

const getVimeoId = (url: string) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match?.[1] || null;
};

const alignClass = (align?: string) =>
  align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

function BlockRenderer({ block }: { block: ContentBlock }) {
  const style: React.CSSProperties = {};
  if (block.bgColor) style.backgroundColor = block.bgColor;
  if (block.textColor) style.color = block.textColor;

  switch (block.type) {
    case "text":
      return (
        <div className={`py-6 md:py-10 px-4 ${alignClass(block.align)}`} style={style}>
          <div
            className="container mx-auto max-w-4xl prose prose-sm sm:prose-base md:prose-lg max-w-none break-words"
            style={block.textColor ? { color: block.textColor } : undefined}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        </div>
      );

    case "image":
      return (
        <div className={`py-4 md:py-8 px-4 ${alignClass(block.align)}`} style={style}>
          <div className="container mx-auto max-w-4xl">
            <img
              src={block.content}
              alt=""
              className="w-full rounded-lg object-cover max-h-[300px] sm:max-h-[450px] md:max-h-[600px]"
              loading="lazy"
            />
          </div>
        </div>
      );

    case "video": {
      const ytId = getYouTubeId(block.content);
      const vimeoId = getVimeoId(block.content);
      const embedUrl = ytId
        ? `https://www.youtube.com/embed/${ytId}`
        : vimeoId
        ? `https://player.vimeo.com/video/${vimeoId}`
        : block.content;

      return (
        <div className="py-4 md:py-8 px-4" style={style}>
          <div className="container mx-auto max-w-4xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      );
    }

    case "social": {
      const isEmbed = block.content.includes("<iframe") || block.content.includes("<blockquote");
      return (
        <div className="py-4 md:py-8 px-4" style={style}>
          <div className="container mx-auto max-w-2xl">
            {isEmbed ? (
              <div dangerouslySetInnerHTML={{ __html: block.content }} className="flex justify-center [&>*]:max-w-full" />
            ) : (
              <a
                href={block.content}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-primary underline hover:text-primary/80 break-all"
              >
                {block.content}
              </a>
            )}
          </div>
        </div>
      );
    }

    case "divider":
      return (
        <div className="py-4 px-4" style={style}>
          <div className="container mx-auto max-w-4xl">
            <hr className="border-border" />
          </div>
        </div>
      );

    default:
      return null;
  }
}

const CustomPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: page, isLoading } = useQuery({
    queryKey: ["custom_page", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_pages" as any)
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .single();
      if (error) throw error;
      return data as any;
    },
    enabled: !!slug,
  });

  const parseBlocks = (content: string): ContentBlock[] => {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    if (content) return [{ id: "legacy", type: "text", content, align: "left" }];
    return [];
  };

  const blocks = page?.content ? parseBlocks(page.content) : [];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !page ? (
        <div className="text-center py-24">
          <p className="text-muted-foreground mb-4">Página não encontrada.</p>
          <Link to="/">
            <Button variant="outline" className="border-primary text-primary">Voltar ao Início</Button>
          </Link>
        </div>
      ) : (
        <>
          <section className="py-10 md:py-16 bg-dark-surface">
            <div className="container mx-auto px-4 text-center">
              <h1 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">{page.title}</h1>
            </div>
          </section>

          {page.image_url && (
            <div className="container mx-auto px-4 -mt-4">
              <img
                src={page.image_url}
                alt={page.title}
                className="w-full max-w-4xl mx-auto rounded-lg object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"
                loading="lazy"
              />
            </div>
          )}

          {blocks.length > 0 ? (
            <div>
              {blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </div>
          ) : (
            <div className="py-16" />
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default CustomPage;
