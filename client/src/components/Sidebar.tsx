import { AdPlaceholder } from "./Advertisement";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { formatRelativeTime } from "@/lib/utils";
import type { Article } from "@shared/schema";

interface SidebarProps {
  trendingArticles: Article[];
}

export function Sidebar({ trendingArticles }: SidebarProps) {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="sticky top-20 flex flex-col gap-6">
        <AdPlaceholder placement="sidebar" />

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-accent-blue" />
            <h3 className="font-bold text-lg">Trending Now</h3>
          </div>
          <div className="flex flex-col gap-4">
            {trendingArticles.slice(0, 5).map((article, index) => (
              <Link
                key={article.id}
                href={`/article/${article.id}`}
                className="group flex gap-3"
                data-testid={`trending-article-${article.id}`}
              >
                <span className="text-2xl font-bold text-accent-blue/40 min-w-[2rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent-blue transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(article.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <AdPlaceholder placement="sidebar" />
      </div>
    </aside>
  );
}
