import { Link, useLocation } from "wouter";
import { Menu, Search, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { categories, mediaTypes, type Category, type MediaType } from "@shared/schema";
import { useSearch } from "@/context/SearchContext";
import {
  GoogleTranslator,
  changeGoogleLanguage,
} from "@/components/GoogleTranslator";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { filters, setFilters, isOpen, setIsOpen, clearFilters, hasActiveFilters } = useSearch();
  const [localSearch, setLocalSearch] = useState(filters.search);

  const [selectedLanguage, setSelectedLanguage] = useState(
    () => localStorage.getItem("preferredLanguage") || "en"
  );

  const languages = [
    { code: "rw", name: "Kinyarwanda", flag: "🇷🇼" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "sw", name: "Swahili", flag: "🇹🇿" },
  ];

  /* ---------------- LANGUAGE CHANGE ---------------- */
  const changeLanguage = (code: string) => {
    changeGoogleLanguage(code);
    setSelectedLanguage(code);
  };

  /* ---------------- RESTORE LANGUAGE ---------------- */
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang && savedLang !== "en") {
      changeGoogleLanguage(savedLang);
      setSelectedLanguage(savedLang);
    }
  }, []);

  const isActive = (category: string) => {
    const categorySlug = category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
    return location === `/${categorySlug}` || (location === "/" && category === "All");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: localSearch });
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ ...filters, category: value as Category | "All" });
  };

  const handleMediaTypeChange = (value: string) => {
    setFilters({ ...filters, mediaType: value as MediaType | "all" });
  };

  const handleFromDateChange = (value: string) => {
    setFilters({ ...filters, fromDate: value });
  };

  const handleToDateChange = (value: string) => {
    setFilters({ ...filters, toDate: value });
  };

  const handleClear = () => {
    setLocalSearch("");
    clearFilters();
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* GOOGLE TRANSLATOR (logic only, hidden) */}
      <GoogleTranslator />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-blue/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-accent-blue tracking-tight">Umukunzi</span>
                <span className="text-xs font-semibold text-accent-yellow uppercase tracking-widest">
                  News
                </span>
              </div>
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
            {/* Language Switcher - Desktop */}
            <Select value={selectedLanguage} onValueChange={changeLanguage}>
              <SelectTrigger
                className="w-auto border-none bg-transparent hover:bg-accent focus:ring-0 focus:ring-offset-0 hidden lg:flex"
                data-testid="language-switcher"
              >
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  <span className="text-lg">
                    {languages.find((l) => l.code === selectedLanguage)?.flag}
                  </span>
                  <span className="text-sm font-medium uppercase">
                    {selectedLanguage}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={hasActiveFilters ? "text-accent-blue" : ""}
                  data-testid="button-search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Search & Filter</SheetTitle>
                  <SheetDescription>
                    Find articles by keyword, category, type, or date
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-4">
                  <form onSubmit={handleSearchSubmit} className="space-y-2">
                    <Label htmlFor="search-input">Search</Label>
                    <div className="flex gap-2">
                      <Input
                        id="search-input"
                        type="text"
                        placeholder="Search articles..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                      />
                      <Button type="submit">Search</Button>
                    </div>
                  </form>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={filters.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Media Type</Label>
                    <Select value={filters.mediaType} onValueChange={handleMediaTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {mediaTypes.map((type) => (
                          <SelectItem key={type} value={type} className="capitalize">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {hasActiveFilters && (
                    <Button variant="outline" onClick={handleClear} className="w-full">
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              <div className="px-2 py-3 border-b border-border mb-2">
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Language
                </Label>
                <Select value={selectedLanguage} onValueChange={changeLanguage}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      <span>
                        {languages.find((l) => l.code === selectedLanguage)?.flag}
                      </span>
                      <span>
                        {languages.find((l) => l.code === selectedLanguage)?.name}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-start" variant="ghost">
                  All
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
