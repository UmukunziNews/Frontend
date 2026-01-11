import { NewsCard } from "./NewsCard";
import { Advertisement } from "./Advertisement";
import type { Article, Advertisement as Ad } from "@shared/schema";

interface NewsGridProps {
  articles: Article[];
  advertisements?: Ad[];
  showFeatured?: boolean;
}

export function NewsGrid({ articles, advertisements = [], showFeatured = true }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4 text-muted-foreground">📰</div>
        <h3 className="text-xl font-semibold mb-2">No articles found</h3>
        <p className="text-muted-foreground">
          Check back later for the latest news in this category.
        </p>
      </div>
    );
  }

  const featuredArticle = showFeatured ? articles[0] : null;
  const remainingArticles = showFeatured ? articles.slice(1) : articles;

  const insertAdsIntoGrid = (items: Article[]) => {
    const result: (Article | "ad")[] = [];
    items.forEach((item, index) => {
      result.push(item);
      if ((index + 1) % 6 === 0 && index < items.length - 1) {
        result.push("ad");
      }
    });
    return result;
  };

  const gridItems = insertAdsIntoGrid(remainingArticles);

  return (
    <div className="flex flex-col gap-8">
      {featuredArticle && (
        <section data-testid="featured-section">
          <NewsCard article={featuredArticle} featured />
        </section>
      )}

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridItems.map((item, index) => {
            if (item === "ad") {
              return (
                <div key={`ad-${index}`} className="col-span-1 md:col-span-2 lg:col-span-3">
                  <Advertisement placement="inline" />
                </div>
              );
            }
            return <NewsCard key={item.id} article={item} />;
          })}
        </div>
      </section>
    </div>
  );
}
