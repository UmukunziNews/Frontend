import {
  type User,
  type InsertUser,
  type Article,
  type Advertisement,
  categories,
  type Category,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getArticles(category?: Category | "All"): Promise<Article[]>;
  getArticleById(id: string): Promise<Article | undefined>;
  getTrendingArticles(): Promise<Article[]>;
  getRelatedArticles(articleId: string): Promise<Article[]>;
  getAdvertisements(placement?: string): Promise<Advertisement[]>;
}

const dummyArticles: Article[] = [
  {
    id: "1",
    title: "FUNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNY",
    description:
      "Major technology companies have reported unprecedented profits as artificial intelligence investments continue to pay dividends across multiple sectors.",
    category: "Business & Tech",
    mediaType: "video",
    mediaUrl: "https://www.pexels.com/video/video-of-funny-cat-855029/",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    title:
      "World Cup 2026 Preparations Accelerate as Host Cities Unveil Stadium Renovations",
    description:
      "The countdown to the 2026 FIFA World Cup has intensified with major stadium upgrades being announced across North America.",
    category: "Sports",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "3",
    title: "Award-Winning Director Announces Ambitious New Film Project",
    description:
      "The acclaimed filmmaker has revealed plans for an epic historical drama spanning three centuries, featuring an ensemble cast of international stars.",
    category: "Entertainment",
    mediaType: "video",
    mediaUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "4",
    title:
      "Historic Climate Summit Reaches Landmark Agreement on Carbon Emissions",
    description:
      "World leaders have finalized an unprecedented accord that sets ambitious new targets for reducing greenhouse gas emissions globally.",
    category: "Politics",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "5",
    title:
      "Revolutionary Medical Breakthrough Offers Hope for Rare Disease Patients",
    description:
      "Scientists have developed a groundbreaking gene therapy treatment that could transform the lives of millions suffering from previously untreatable conditions.",
    category: "Society & People",
    mediaType: "video",
    mediaUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "6",
    title:
      "Investigative Report Exposes Widespread Financial Fraud in Banking Sector",
    description:
      "An eight-month investigation has uncovered systematic irregularities at major financial institutions, prompting calls for regulatory reform.",
    category: "Investigations",
    mediaType: "audio",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: "7",
    title:
      "Streaming Platform Announces Biggest Content Investment in Company History",
    description:
      "The entertainment giant is committing billions to original programming as competition for subscriber attention reaches fever pitch.",
    category: "Entertainment",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: "8",
    title: "Electric Vehicle Sales Surge as Battery Technology Advances",
    description:
      "New developments in battery efficiency and charging infrastructure are accelerating the transition to electric transportation worldwide.",
    category: "Business & Tech",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 180),
  },
  {
    id: "9",
    title: "Olympic Champion Announces Retirement After Legendary Career",
    description:
      "The decorated athlete is stepping away from competition after claiming multiple gold medals across three Olympic Games.",
    category: "Sports",
    mediaType: "video",
    mediaUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461896836934-16d7caef9f3a?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 240),
  },
  {
    id: "10",
    title: "International Trade Agreement Faces Opposition from Labor Groups",
    description:
      "Proposed economic partnership between major trading blocs has sparked heated debate over worker protections and environmental standards.",
    category: "Politics",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 300),
  },
  {
    id: "11",
    title:
      "Community Initiative Transforms Urban Neighborhoods Through Arts Programs",
    description:
      "Grassroots organization brings together local artists and residents to revitalize struggling communities with public art installations.",
    category: "Society & People",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 360),
  },
  {
    id: "12",
    title:
      "Whistleblower Reveals Extent of Data Collection by Social Media Platforms",
    description:
      "Former insider shares confidential documents detailing surveillance practices that go far beyond what users have been told.",
    category: "Investigations",
    mediaType: "audio",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 420),
  },
  {
    id: "13",
    title:
      "Music Festival Returns After Pandemic Hiatus with Record-Breaking Lineup",
    description:
      "The iconic summer event announces its most ambitious roster yet, featuring headliners from multiple genres and decades.",
    category: "Entertainment",
    mediaType: "video",
    mediaUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 480),
  },
  {
    id: "14",
    title:
      "Startup Ecosystem Thrives as Venture Capital Investments Hit New Heights",
    description:
      "Record funding rounds signal continued confidence in innovation despite broader economic uncertainties affecting global markets.",
    category: "Business & Tech",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 540),
  },
  {
    id: "15",
    title: "Tennis Star Makes Historic Run at Grand Slam Tournament",
    description:
      "Young prodigy continues to defy expectations, advancing to the finals with a series of stunning upset victories.",
    category: "Sports",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 600),
  },
  {
    id: "16",
    title:
      "Education Reform Bill Sparks Nationwide Debate Over Curriculum Standards",
    description:
      "Proposed legislation would fundamentally reshape how subjects are taught in public schools, drawing both praise and criticism.",
    category: "Politics",
    mediaType: "audio",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 660),
  },
  {
    id: "17",
    title:
      "Mental Health Awareness Campaign Reaches Millions Through Celebrity Partnerships",
    description:
      "High-profile advocates are helping to destigmatize conversations around psychological wellbeing in communities across the country.",
    category: "Society & People",
    mediaType: "video",
    mediaUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 720),
  },
  {
    id: "18",
    title: "Corporate Lobbying Investigation Reveals Hidden Influence Networks",
    description:
      "Documents obtained through freedom of information requests expose previously unknown connections between industry groups and policymakers.",
    category: "Investigations",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 780),
  },
];

const dummyAdvertisements: Advertisement[] = [
  {
    id: "ad1",
    title: "Premium Tech Products",
    imageUrl:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=250&fit=crop",
    linkUrl: "https://example.com/tech",
    placement: "sidebar",
  },
  {
    id: "ad2",
    title: "Exclusive Travel Deals",
    imageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=728&h=90&fit=crop",
    linkUrl: "https://example.com/travel",
    placement: "inline",
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private articles: Article[];
  private advertisements: Advertisement[];

  constructor() {
    this.users = new Map();
    this.articles = dummyArticles;
    this.advertisements = dummyAdvertisements;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getArticles(category?: Category | "All"): Promise<Article[]> {
    if (!category || category === "All") {
      return [...this.articles].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    return this.articles
      .filter((article) => article.category === category)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  async getArticleById(id: string): Promise<Article | undefined> {
    return this.articles.find((article) => article.id === id);
  }

  async getTrendingArticles(): Promise<Article[]> {
    return [...this.articles].sort(() => Math.random() - 0.5).slice(0, 5);
  }

  async getRelatedArticles(articleId: string): Promise<Article[]> {
    const article = await this.getArticleById(articleId);
    if (!article) return [];

    return this.articles
      .filter((a) => a.id !== articleId && a.category === article.category)
      .slice(0, 3);
  }

  async getAdvertisements(placement?: string): Promise<Advertisement[]> {
    if (!placement) {
      return this.advertisements;
    }
    return this.advertisements.filter((ad) => ad.placement === placement);
  }
}

export const storage = new MemStorage();
