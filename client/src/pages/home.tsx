import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NewsGrid } from "@/components/NewsGrid";
import { Sidebar } from "@/components/Sidebar";
import { CategoryTabs } from "@/components/CategoryTabs";
import { LoadingGrid, LoadingSidebar } from "@/components/LoadingState";
import type { Article, Category } from "@shared/schema";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const categoryParam = activeCategory === "All" ? "" : `?category=${encodeURIComponent(activeCategory)}`;

  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", activeCategory],
    queryFn: async () => {
      const res = await fetch(`/api/articles${categoryParam}`);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
  });

  const { data: trendingArticles = [], isLoading: trendingLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/trending"],
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {articlesLoading ? (
              <LoadingGrid />
            ) : (
              <NewsGrid articles={articles} showFeatured={activeCategory === "All"} />
            )}
          </div>

          <div className="lg:block">
            {trendingLoading ? (
              <LoadingSidebar />
            ) : (
              <Sidebar trendingArticles={trendingArticles} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
