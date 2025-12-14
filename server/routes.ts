import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { categories, type Category, type MediaType, type ArticleFilters } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/articles", async (req, res) => {
    try {
      const filters: ArticleFilters = {
        category: req.query.category as Category | "All" | undefined,
        search: req.query.search as string | undefined,
        mediaType: req.query.mediaType as MediaType | undefined,
        fromDate: req.query.fromDate as string | undefined,
        toDate: req.query.toDate as string | undefined,
      };
      const articles = await storage.getArticles(filters);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/trending", async (req, res) => {
    try {
      const articles = await storage.getTrendingArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trending articles" });
    }
  });

  app.get("/api/articles/related/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const articles = await storage.getRelatedArticles(id);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const article = await storage.getArticleById(id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.patch("/api/articles/:id/view", async (req, res) => {
    try {
      const { id } = req.params;
      const article = await storage.incrementViewCount(id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json({ viewCount: article.viewCount });
    } catch (error) {
      res.status(500).json({ error: "Failed to increment view count" });
    }
  });

  app.get("/api/advertisements", async (req, res) => {
    try {
      const placement = req.query.placement as string | undefined;
      const ads = await storage.getAdvertisements(placement);
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch advertisements" });
    }
  });

  app.get("/api/seasonal-banner", async (req, res) => {
    try {
      const banner = await storage.getActiveSeasonalBanner();
      res.json(banner);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch seasonal banner" });
    }
  });

  return httpServer;
}
