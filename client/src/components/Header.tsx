import { Link, useLocation } from "wouter";
import { Menu, Search, X } from "lucide-react";
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
import { useState } from "react";
import { categories, mediaTypes, type Category, type MediaType } from "@shared/schema";
import { useSearch } from "@/context/SearchContext";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { filters, setFilters, isOpen, setIsOpen, clearFilters, hasActiveFilters } = useSearch();
  const [localSearch, setLocalSearch] = useState(filters.search);

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
                        data-testid="input-search"
                      />
                      <Button type="submit" data-testid="button-search-submit">
                        Search
                      </Button>
                    </div>
                  </form>

                  <div className="space-y-2">
                    <Label htmlFor="filter-category">Category</Label>
                    <Select value={filters.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger id="filter-category" data-testid="select-filter-category">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filter-media-type">Media Type</Label>
                    <Select value={filters.mediaType} onValueChange={handleMediaTypeChange}>
                      <SelectTrigger id="filter-media-type" data-testid="select-filter-media-type">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {mediaTypes.map((type) => (
                          <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filter-from-date">From Date</Label>
                    <Input
                      id="filter-from-date"
                      type="date"
                      value={filters.fromDate}
                      onChange={(e) => handleFromDateChange(e.target.value)}
                      data-testid="input-filter-from-date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filter-to-date">To Date</Label>
                    <Input
                      id="filter-to-date"
                      type="date"
                      value={filters.toDate}
                      onChange={(e) => handleToDateChange(e.target.value)}
                      data-testid="input-filter-to-date"
                    />
                  </div>

                  {hasActiveFilters && (
                    <Button variant="outline" onClick={handleClear} className="w-full" data-testid="button-clear-filters">
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
