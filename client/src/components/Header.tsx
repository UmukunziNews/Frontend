import { Link, useLocation } from "wouter";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { categories } from "@shared/schema";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (category: string) => {
    const categorySlug = category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
    return location === `/${categorySlug}` || (location === "/" && category === "All");
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-accent-blue">News</span>
              <span className="text-2xl font-bold text-accent-yellow">Hub</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-wrap">
            <Link href="/">
              <Button
                variant={location === "/" ? "default" : "ghost"}
                size="sm"
                className={location === "/" ? "bg-accent-blue text-white" : ""}
                data-testid="nav-all"
              >
                All
              </Button>
            </Link>
            {categories.map((category) => {
              const categorySlug = category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
              const active = isActive(category);
              return (
                <Link key={category} href={`/${categorySlug}`}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={active ? "bg-accent-blue text-white" : ""}
                    data-testid={`nav-${categorySlug}`}
                  >
                    {category}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" data-testid="button-search">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={location === "/" ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${location === "/" ? "bg-accent-blue text-white" : ""}`}
                  data-testid="mobile-nav-all"
                >
                  All
                </Button>
              </Link>
              {categories.map((category) => {
                const categorySlug = category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
                const active = isActive(category);
                return (
                  <Link key={category} href={`/${categorySlug}`} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start ${active ? "bg-accent-blue text-white" : ""}`}
                      data-testid={`mobile-nav-${categorySlug}`}
                    >
                      {category}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
