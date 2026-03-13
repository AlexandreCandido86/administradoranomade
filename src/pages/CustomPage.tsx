import { useParams, Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              />
            </div>
          )}

          <article className="py-10 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="prose prose-invert prose-sm sm:prose-base md:prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-wrap break-words">
                {page.content}
              </div>
            </div>
          </article>
        </>
      )}

      <Footer />
    </div>
  );
};

export default CustomPage;
