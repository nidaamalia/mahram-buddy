import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Catat from "./pages/Catat";
import Cek from "./pages/Cek";
import Info from "./pages/Info";
import AnakDetail from "./pages/AnakDetail";
import IbuSusuDetail from "./pages/IbuSusuDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catat" element={<Catat />} />
            <Route path="/cek" element={<Cek />} />
            <Route path="/info" element={<Info />} />
            <Route path="/anak/:id" element={<AnakDetail />} />
            <Route path="/ibu-susu/:id" element={<IbuSusuDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
