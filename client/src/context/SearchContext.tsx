import { createContext, useContext, useState, type ReactNode } from "react";
import type { Category, MediaType } from "@shared/schema";

export interface SearchFiltersState {
  search: string;
  category: Category | "All";
  mediaType: MediaType | "all";
  fromDate: string;
  toDate: string;
}

export const defaultFilters: SearchFiltersState = {
  search: "",
  category: "All",
  mediaType: "all",
  fromDate: "",
  toDate: "",
};

interface SearchContextType {
  filters: SearchFiltersState;
  setFilters: (filters: SearchFiltersState) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<SearchFiltersState>(defaultFilters);
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = 
    filters.search !== "" || 
    filters.category !== "All" || 
    filters.mediaType !== "all" ||
    filters.fromDate !== "" ||
    filters.toDate !== "";

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <SearchContext.Provider value={{ 
      filters, 
      setFilters, 
      isOpen, 
      setIsOpen, 
      clearFilters,
      hasActiveFilters 
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
