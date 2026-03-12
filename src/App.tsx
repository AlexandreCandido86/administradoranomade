import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { DynamicColorProvider } from "@/components/DynamicColorProvider";
import Index from "./pages/Index.tsx";
import QuemSomosPage from "./pages/QuemSomosPage.tsx";
import ServicosPage from "./pages/ServicosPage.tsx";
import SindicosPage from "./pages/SindicosPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import ContatoPage from "./pages/ContatoPage.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DynamicColorProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quem-somos" element={<QuemSomosPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/sindicos" element={<SindicosPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </DynamicColorProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
