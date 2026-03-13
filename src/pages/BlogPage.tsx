import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContentValue } from "@/hooks/useSiteContent";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

const POSTS_PER_PAGE = 3;

const BlogPage = () => {
  const pageTitle = useContentValue("blog_page", "title", "Blog");
  const pageIntro = useContentValue("blog_page", "intro", "Fique por dentro das últimas novidades sobre gestão condominial, dicas para síndicos e muito mais.");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const visiblePosts = posts?.slice(0, visibleCount) ?? [];
  const hasMore = posts ? visibleCount < posts.length : false;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <section className="py-10 md:py-16 bg-dark-surface">
        <div className="container mx-auto px-4 text-center">
          <p className="section-label mb-2">〰〰 BLOG 〰〰</p>
          <h1 className="section-title text-2xl sm:text-3xl md:text-5xl mb-3 md:mb-4">{pageTitle}</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto px-2">{pageIntro}</p>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : visiblePosts.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum post publicado ainda.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {visiblePosts.map((post) => (
                  <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors flex flex-col">
                    <div className="h-40 sm:h-48 bg-muted flex items-center justify-center overflow-hidden">
                      {post.image_url ? (
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-muted-foreground text-sm">Imagem do artigo</span>
                      )}
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-1">
                      <p className="text-xs text-primary font-semibold mb-2">
                        {new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                      <h3 className="text-lg font-semibold text-foreground mb-3">{post.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.description}</p>
                      <Link to={`/blog/${post.id}`} className="mt-4 inline-block">
                        <Button variant="link" className="text-primary p-0 h-auto gap-1 text-sm font-semibold">
                          Ler mais <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Ver mais
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
