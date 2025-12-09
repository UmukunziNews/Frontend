import { cn } from "@/lib/utils";
import type { Advertisement as Ad } from "@shared/schema";

interface AdvertisementProps {
  ad: Ad;
  className?: string;
}

export function Advertisement({ ad, className }: AdvertisementProps) {
  return (
    <div className={cn("flex flex-col", className)} data-testid={`ad-${ad.id}`}>
      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Advertisement
      </span>
      <a
        href={ad.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg border border-border hover-elevate"
      >
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full h-auto object-cover"
        />
      </a>
    </div>
  );
}

interface AdPlaceholderProps {
  placement: "sidebar" | "inline";
  className?: string;
}

export function AdPlaceholder({ placement, className }: AdPlaceholderProps) {
  const dimensions = placement === "sidebar" ? "w-full aspect-[300/250]" : "w-full aspect-[728/90] max-h-24";
  
  return (
    <div className={cn("flex flex-col", className)} data-testid={`ad-placeholder-${placement}`}>
      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Advertisement
      </span>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30",
          dimensions
        )}
      >
        <span className="text-sm text-muted-foreground">Ad Space</span>
      </div>
    </div>
  );
}
