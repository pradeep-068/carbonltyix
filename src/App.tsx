import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import DigitalTwin from "./pages/DigitalTwin";
import Sensors from "./pages/Sensors";
import CarbonAnalytics from "./pages/CarbonAnalytics";
import Energy from "./pages/Energy";
import Equipment from "./pages/Equipment";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/carbon" element={<CarbonAnalytics />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
