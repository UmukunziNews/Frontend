import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { NewsGrid } from "@/components/NewsGrid";
import { Sidebar } from "@/components/Sidebar";
import { LoadingGrid, LoadingSidebar } from "@/components/LoadingState";
import type { Article, Category } from "@shared/schema";

function getCategoryFromSlug(slug: string): Category | null {
  const categoryMap: Record<string, Category> = {
    "entertainment": "Entertainment",
    "business-tech": "Business & Tech",
    "sports": "Sports",
    "politics": "Politics",
    "society-people": "Society & People",
    "investigations": "Investigations",
  };
  return categoryMap[slug] || null;
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category || "";
  const category = getCategoryFromSlug(categorySlug);

  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", category],
    queryFn: async () => {
      if (!category) return [];
      const res = await fetch(`/api/articles?category=${encodeURIComponent(category)}`);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
    enabled: !!category,
  });

  const { data: trendingArticles = [], isLoading: trendingLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/trending"],
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">
            The category you're looking for doesn't exist.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="category-title">
            {category}
          </h1>
          <p className="text-muted-foreground">
            Latest news and updates from {category.toLowerCase()}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {articlesLoading ? (
              <LoadingGrid />
            ) : (
              <NewsGrid articles={articles} showFeatured />
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
