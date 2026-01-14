import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchProvider } from "@/context/SearchContext";
import Home from "@/pages/home";
import Category from "@/pages/category";
import Article from "@/pages/article";
import About from "@/pages/aboutSecond";
import Advertise from "@/pages/advertise";
import Careers from "@/pages/careers";
import NotFound from "@/pages/404";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/advertise" component={Advertise} />
      <Route path="/careers" component={Careers} />
      <Route path="/article/:id" component={Article} />
      <Route path="/:category" component={Category} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SearchProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
              <Router />
            </div>
            <Footer />
          </div>
        </SearchProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
