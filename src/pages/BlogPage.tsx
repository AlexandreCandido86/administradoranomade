import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContentValue } from "@/hooks/useSiteContent";

const BlogPage = () => {
  const pageTitle = useContentValue("blog_page", "title", "Blog");
  const pageIntro = useContentValue("blog_page", "intro", "Fique por dentro das últimas novidades sobre gestão condominial, dicas para síndicos e muito mais.");
  const post1Title = useContentValue("blog_page", "post_1_title", "Como escolher a melhor administradora de condomínios");
  const post1Desc = useContentValue("blog_page", "post_1_desc", "Descubra os critérios essenciais para selecionar uma administradora que realmente atenda às necessidades do seu condomínio.");
  const post1Date = useContentValue("blog_page", "post_1_date", "12 Mar 2026");
  const post2Title = useContentValue("blog_page", "post_2_title", "5 dicas para uma assembleia de condomínio produtiva");
  const post2Desc = useContentValue("blog_page", "post_2_desc", "Aprenda como organizar assembleias mais eficientes e obter resultados positivos para todos os condôminos.");
  const post2Date = useContentValue("blog_page", "post_2_date", "08 Mar 2026");
  const post3Title = useContentValue("blog_page", "post_3_title", "Gestão financeira condominial: boas práticas");
  const post3Desc = useContentValue("blog_page", "post_3_desc", "Entenda como manter as finanças do condomínio organizadas e garantir transparência para todos os moradores.");
  const post3Date = useContentValue("blog_page", "post_3_date", "01 Mar 2026");

  const posts = [
    { title: post1Title, desc: post1Desc, date: post1Date },
    { title: post2Title, desc: post2Desc, date: post2Date },
    { title: post3Title, desc: post3Desc, date: post3Date },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <section className="py-16 bg-dark-surface">
        <div className="container mx-auto px-4 text-center">
          <p className="section-label mb-2">〰〰 BLOG 〰〰</p>
          <h1 className="section-title text-4xl md:text-5xl mb-4">{pageTitle}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{pageIntro}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.title} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Imagem do artigo</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-primary font-semibold mb-2">{post.date}</p>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
