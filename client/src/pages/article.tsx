import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaPlayer } from "@/components/MediaPlayer";
import { NewsCard } from "@/components/NewsCard";
import { SocialShare } from "@/components/SocialShare";
import { LoadingArticle } from "@/components/LoadingState";
import { AdPlaceholder } from "@/components/Advertisement";
import { formatRelativeTime } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import type { Article } from "@shared/schema";

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id || "";
  const queryClient = useQueryClient();

  const { data: article, isLoading: articleLoading } = useQuery<Article>({
    queryKey: ["/api/articles", articleId],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${articleId}`);
      if (!res.ok) throw new Error("Article not found");
      return res.json();
    },
    enabled: !!articleId,
  });

  const viewMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/articles/${articleId}/view`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles", articleId] });
    },
  });

  useEffect(() => {
    if (articleId) {
      viewMutation.mutate();
    }
  }, [articleId]);

  const { data: relatedArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/related", articleId],
    queryFn: async () => {
      const res = await fetch(`/api/articles/related/${articleId}`);
      if (!res.ok) throw new Error("Failed to fetch related articles");
      return res.json();
    },
    enabled: !!articleId,
  });

  if (articleLoading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-4xl mx-auto px-4 py-8">
          <LoadingArticle />
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const categorySlug = article.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>
        </Link>

        <article>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Link href={`/${categorySlug}`}>
                <Badge className="bg-accent-blue text-white cursor-pointer">
                  {article.category}
                </Badge>
              </Link>
              <span className="text-sm text-muted-foreground">
                {formatRelativeTime(article.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight line-clamp-3" data-testid="article-title">
              {article.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-4">
              {article.description}
            </p>

            <SocialShare
              title={article.title}
              url={`/article/${article.id}`}
              viewCount={article.viewCount}
            />
          </div>

          <div className="mb-8">
            <MediaPlayer
              type={article.mediaType as "video" | "audio" | "image"}
              src={article.mediaUrl}
              thumbnailUrl={article.thumbnailUrl}
              title={article.title}
            />
          </div>

          <AdPlaceholder placement="inline" className="mb-12" />
        </article>

        {relatedArticles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.slice(0, 3).map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
