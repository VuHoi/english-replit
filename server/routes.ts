import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Vocabulary routes
  app.get("/api/vocabulary/progress/:userId", async (req, res) => {
    const progress = await storage.getVocabularyProgress(Number(req.params.userId));
    res.json(progress);
  });

  app.post("/api/vocabulary/progress", async (req, res) => {
    const { userId, wordId, learned } = req.body;
    await storage.updateVocabularyProgress(userId, wordId, learned);
    res.json({ success: true });
  });

  // Grammar routes
  app.get("/api/grammar/progress/:userId", async (req, res) => {
    const progress = await storage.getGrammarProgress(Number(req.params.userId));
    res.json(progress);
  });

  app.post("/api/grammar/progress", async (req, res) => {
    const { userId, lessonId, completed, score } = req.body;
    await storage.updateGrammarProgress(userId, lessonId, completed, score);
    res.json({ success: true });
  });

  // Speaking routes
  app.get("/api/speaking/progress/:userId", async (req, res) => {
    const progress = await storage.getSpeakingProgress(Number(req.params.userId));
    res.json(progress);
  });

  app.post("/api/speaking/progress", async (req, res) => {
    const { userId, exerciseId, completed, recordingUrl } = req.body;
    await storage.updateSpeakingProgress(userId, exerciseId, completed, recordingUrl);
    res.json({ success: true });
  });

  // Writing routes
  app.get("/api/writing/progress/:userId", async (req, res) => {
    const progress = await storage.getWritingProgress(Number(req.params.userId));
    res.json(progress);
  });

  app.post("/api/writing/progress", async (req, res) => {
    const { userId, promptId, submission, feedback } = req.body;
    await storage.updateWritingProgress(userId, promptId, submission, feedback);
    res.json({ success: true });
  });

  return httpServer;
}
