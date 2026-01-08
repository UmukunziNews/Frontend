import { useMemo } from "react";
import { getApiUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { NewsGrid } from "@/components/NewsGrid";
import { Sidebar } from "@/components/Sidebar";
import { SeasonalBanner } from "@/components/SeasonalBanner";
import { LoadingGrid, LoadingSidebar } from "@/components/LoadingState";
import { useSearch } from "@/context/SearchContext";
import type { Article } from "@shared/schema";

export default function Home() {
  const { filters, hasActiveFilters } = useSearch();

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.category !== "All") params.append("category", filters.category);
    if (filters.search) params.append("search", filters.search);
    if (filters.mediaType !== "all") params.append("mediaType", filters.mediaType);
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    return params.toString();
  }, [filters]);

  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", queryParams],
    queryFn: async () => {
      const url = queryParams ? `/api/articles?${queryParams}` : "/api/articles";
      const res = await fetch(getApiUrl(url));
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
  });

  const { data: trendingArticles = [], isLoading: trendingLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/trending"],
  });

  return (
    <div className="min-h-screen bg-background">
      <SeasonalBanner />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {articles.length === 0 && !articlesLoading && (
          <div className="text-center py-12 mb-8">
            <h2 className="text-2xl font-bold mb-2">No articles found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {articlesLoading ? (
              <LoadingGrid />
            ) : (
              <NewsGrid articles={articles} showFeatured={!hasActiveFilters} />
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
