import { useParams, Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog_post", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !post ? (
        <div className="text-center py-24">
          <p className="text-muted-foreground mb-4">Post não encontrado.</p>
          <Link to="/blog">
            <Button variant="outline" className="border-primary text-primary">Voltar ao Blog</Button>
          </Link>
        </div>
      ) : (
        <>
          <section className="py-10 md:py-16 bg-dark-surface">
            <div className="container mx-auto px-4 text-center">
              <p className="text-xs text-primary font-semibold mb-3">
                {new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
              <h1 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 max-w-3xl mx-auto px-2">{post.title}</h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto px-2">{post.description}</p>
            </div>
          </section>

          {post.image_url && (
            <div className="container mx-auto px-4 -mt-4">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full max-w-4xl mx-auto rounded-lg object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"
              />
            </div>
          )}

          <article className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <div
                className="prose prose-invert prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-wrap"
              >
                {(post as any).content || post.description}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <Link to="/blog">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar ao Blog
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
