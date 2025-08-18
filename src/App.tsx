import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Newsletters from "./pages/Newsletters";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Subscribers from "./pages/Users";
import PrivateRoute from "./utils/PrivateRoute";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    // <SidebarProvider>
    //   <div className="min-h-screen flex w-full bg-background">
    //     <AppSidebar />
    //     <div className="flex-1 flex flex-col">
    //       <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6">
    //         <SidebarTrigger className="mr-4" />
    //         <h1 className="text-xl font-semibold">Dashboard</h1>
    //       </header>
    //       <main className="flex-1 p-6">
    //         <Routes>
    //           <Route path="/" element={<Dashboard />} />
    //           <Route path="/subscribers" element={<Subscribers />} />
    //           <Route path="/newsletters" element={<Newsletters />} />
    //           <Route path="/contact" element={<Contact />} />
    //           <Route path="*" element={<NotFound />} />
    //         </Routes>
    //       </main>
    //     </div>
    //   </div>
    // </SidebarProvider>
    
      <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </header>
          <main className="flex-1 p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/subscribers"
                element={
                  <PrivateRoute>
                    <Subscribers />
                  </PrivateRoute>
                }
              />
              <Route
                path="/newsletters"
                element={
                  <PrivateRoute>
                    <Newsletters />
                  </PrivateRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <PrivateRoute>
                    <Contact />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
