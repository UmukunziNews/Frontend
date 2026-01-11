// Categories for news articles
export const categories = [
  "Entertainment",
  "Business & Tech",
  "Sports",
  "Politics",
  "Society & People",
  "Investigations",
] as const;

export type Category = (typeof categories)[number];

// Media types for articles
export const mediaTypes = ["video", "image", "audio"] as const;
export type MediaType = (typeof mediaTypes)[number]

// Article search/filter parameters
export interface ArticleFilters {
  category?: Category | "All";
  search?: string;
  mediaType?: MediaType;
  fromDate?: string;
  toDate?: string;
}

// Seasonal banner types
export const seasonalBannerTypes = ["christmas", "heroes-day", "black-friday"] as const;
export type SeasonalBannerType = (typeof seasonalBannerTypes)[number];

export interface SeasonalBanner {
  id: string;
  type: SeasonalBannerType;
  title: string;
  subtitle?: string;
  mediaType: "image" | "video" | "gif";
  mediaUrl: string;
  ctaText?: string;
  ctaUrl?: string;
  startDate: string;
  endDate: string;
  backgroundColor?: string;
}
export type AdvertisementPlacement = "sidebar" | "inline";


export interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  placement: AdvertisementPlacement;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: Category;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
  viewCount: number;
}

export interface User {
  id: string;
  username: string;
  password: string;
}


