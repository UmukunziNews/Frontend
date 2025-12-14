import { useState } from "react";
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
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, mediaTypes, type Category, type MediaType } from "@shared/schema";

export interface SearchFiltersState {
  search: string;
  category: Category | "All";
  mediaType: MediaType | "all";
  fromDate: string;
  toDate: string;
}

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
  onClear: () => void;
}

export const defaultFilters: SearchFiltersState = {
  search: "",
  category: "All",
  mediaType: "all",
  fromDate: "",
  toDate: "",
};

export function SearchFilters({ filters, onFiltersChange, onClear }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search);

  const hasActiveFilters = 
    filters.search !== "" || 
    filters.category !== "All" || 
    filters.mediaType !== "all" ||
    filters.fromDate !== "" ||
    filters.toDate !== "";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, search: localSearch });
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value as Category | "All" });
  };

  const handleMediaTypeChange = (value: string) => {
    onFiltersChange({ ...filters, mediaType: value as MediaType | "all" });
  };

  const handleFromDateChange = (value: string) => {
    onFiltersChange({ ...filters, fromDate: value });
  };

  const handleToDateChange = (value: string) => {
    onFiltersChange({ ...filters, toDate: value });
  };

  const handleClear = () => {
    setLocalSearch("");
    onClear();
  };

  const FilterControls = () => (
    <div className="flex flex-col gap-4">
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
  );

  return (
    <form onSubmit={handleSearchSubmit} className="w-full">
      <div className="relative w-full">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              data-testid="button-open-filters"
            >
              <Search className="h-4 w-4" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Articles</SheetTitle>
              <SheetDescription>
                Refine your search with advanced filters
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterControls />
            </div>
          </SheetContent>
        </Sheet>
        <Input
          type="text"
          placeholder="Search articles..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>
    </form>
  );
}
