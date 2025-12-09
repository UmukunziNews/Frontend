import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { categories, type Category } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/articles", async (req, res) => {
    try {
      const category = req.query.category as Category | "All" | undefined;
      const articles = await storage.getArticles(category);
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

  app.get("/api/advertisements", async (req, res) => {
    try {
      const placement = req.query.placement as string | undefined;
      const ads = await storage.getAdvertisements(placement);
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch advertisements" });
    }
  });

  return httpServer;
}
