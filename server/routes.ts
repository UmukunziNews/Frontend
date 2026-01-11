import type { Express } from "express";
import { createServer, type Server } from "http";

const EXTERNAL_API_BASE = process.env.EXTERNAL_API_BASE || "";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/articles", async (req, res) => {
    try {
      const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
      const url = queryString ? `${EXTERNAL_API_BASE}/api/articles?${queryString}` : `${EXTERNAL_API_BASE}/api/articles`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/trending", async (req, res) => {
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/api/articles/trending`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trending articles" });
    }
  });

  app.get("/api/articles/related/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await fetch(`${EXTERNAL_API_BASE}/api/articles/related/${id}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await fetch(`${EXTERNAL_API_BASE}/api/articles/${id}`);
      if (!response.ok) {
        return res.status(404).json({ error: "Article not found" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.patch("/api/articles/:id/view", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await fetch(`${EXTERNAL_API_BASE}/api/articles/${id}/view`, {
        method: "PATCH",
      });
      if (!response.ok) {
        return res.status(404).json({ error: "Article not found" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to increment view count" });
    }
  });

  app.get("/api/advertisements", async (req, res) => {
    try {
      const placement = req.query.placement as string | undefined;
      const url = placement 
        ? `${EXTERNAL_API_BASE}/api/advertisements?placement=${placement}` 
        : `${EXTERNAL_API_BASE}/api/advertisements`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch advertisements" });
    }
  });

  app.get("/api/seasonal-banner", async (req, res) => {
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/api/seasonal-banners/active`);
      if (!response.ok) {
        return res.json(null);
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch seasonal banner" });
    }
  });

  return httpServer;
}
