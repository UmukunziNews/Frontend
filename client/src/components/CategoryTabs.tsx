import { cn } from "@/lib/utils";
import { categories, type Category } from "@shared/schema";

interface CategoryTabsProps {
  activeCategory: Category | "All";
  onCategoryChange: (category: Category | "All") => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const allCategories: (Category | "All")[] = ["All", ...categories];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 pb-2 min-w-max">
        {allCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
                isActive
                  ? "bg-accent-blue text-white"
                  : "bg-transparent text-foreground hover-elevate"
              )}
              data-testid={`tab-${category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
