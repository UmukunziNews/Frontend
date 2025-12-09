import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play, Volume2, Image as ImageIcon } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { Article } from "@shared/schema";

interface NewsCardProps {
  article: Article;
  featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const { id, title, description, category, mediaType, thumbnailUrl, createdAt } = article;

  const getMediaIcon = () => {
    switch (mediaType) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "audio":
        return <Volume2 className="h-4 w-4" />;
      default:
        return <ImageIcon className="h-4 w-4" />;
    }
  };

  const categorySlug = category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  if (featured) {
    return (
      <Link href={`/article/${id}`}>
        <Card
          className="group relative overflow-visible rounded-lg cursor-pointer hover-elevate"
          data-testid={`card-article-featured-${id}`}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-accent-blue text-white text-xs uppercase tracking-wide">
                  {category}
                </Badge>
                <div className="flex items-center gap-1 text-white/80">
                  {getMediaIcon()}
                  <span className="text-xs uppercase">{mediaType}</span>
                </div>
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
                {title}
              </h2>
              <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-3xl">
                {description}
              </p>
              <p className="text-white/60 text-sm mt-3">
                {formatRelativeTime(createdAt)}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/article/${id}`}>
      <Card
        className="group overflow-visible rounded-lg cursor-pointer hover-elevate h-full"
        data-testid={`card-article-${id}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge className="bg-accent-blue text-white text-xs uppercase tracking-wide">
              {category}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-md text-xs">
            {getMediaIcon()}
            <span className="uppercase">{mediaType}</span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-accent-blue transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
          <p className="text-muted-foreground text-xs mt-auto">
            {formatRelativeTime(createdAt)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
