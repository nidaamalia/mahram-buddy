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

import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import IbuSusuAdmin from "./pages/admin/IbuSusuAdmin";
import AnakAdmin from "./pages/admin/AnakAdmin";
import SusuanAdmin from "./pages/admin/SusuanAdmin";
import DuplikatAdmin from "./pages/admin/DuplikatAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout children={undefined} />}>
            {/* Layout wraps via Outlet — but current Layout uses children prop, 
                so we keep the existing pattern */}
          </Route>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/catat" element={<Layout><Catat /></Layout>} />
          <Route path="/cek" element={<Layout><Cek /></Layout>} />
          <Route path="/info" element={<Layout><Info /></Layout>} />
          <Route path="/anak/:id" element={<Layout><AnakDetail /></Layout>} />
          <Route path="/ibu-susu/:id" element={<Layout><IbuSusuDetail /></Layout>} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="ibu-susu" element={<IbuSusuAdmin />} />
            <Route path="anak" element={<AnakAdmin />} />
            <Route path="susuan" element={<SusuanAdmin />} />
            <Route path="duplikat" element={<DuplikatAdmin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
