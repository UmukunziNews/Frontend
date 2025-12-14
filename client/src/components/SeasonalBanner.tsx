import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { SeasonalBanner as SeasonalBannerType } from "@shared/schema";

export function SeasonalBanner() {
  const { data: banner } = useQuery<SeasonalBannerType | null>({
    queryKey: ["/api/seasonal-banner"],
  });

  if (!banner) {
    return null;
  }

  const bgStyle = banner.backgroundColor 
    ? { backgroundColor: banner.backgroundColor }
    : undefined;

  return (
    <div 
      className="relative w-full overflow-hidden"
      style={bgStyle}
      data-testid="seasonal-banner"
    >
      <div className="relative">
        {banner.mediaType === "video" ? (
          <video
            src={banner.mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-48 md:h-64 object-cover"
          />
        ) : (
          <img
            src={banner.mediaUrl}
            alt={banner.title}
            className="w-full h-48 md:h-64 object-cover"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-lg">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="text-white/90 text-sm md:text-lg mb-4 drop-shadow">
                  {banner.subtitle}
                </p>
              )}
              {banner.ctaText && banner.ctaUrl && (
                <Link href={banner.ctaUrl}>
                  <Button 
                    className="bg-accent-yellow text-black font-semibold border-accent-yellow"
                    data-testid="button-banner-cta"
                  >
                    {banner.ctaText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
