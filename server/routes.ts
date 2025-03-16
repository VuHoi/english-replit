import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

interface IStorage {
  getVocabularyProgress(userId: number): Promise<any>;
  updateVocabularyProgress(userId: number, wordId: number, learned: boolean): Promise<void>;
  getGrammarProgress(userId: number): Promise<any>;
  updateGrammarProgress(userId: number, lessonId: number, completed: boolean, score: number): Promise<void>;
  getSpeakingProgress(userId: number): Promise<any>;
  updateSpeakingProgress(userId: number, exerciseId: number, completed: boolean, recordingUrl: string): Promise<void>;
  getWritingProgress(userId: number): Promise<any>;
  updateWritingProgress(userId: number, promptId: number, submission: string, feedback: string): Promise<void>;
  getUserStreak(userId: number): Promise<{ currentStreak: number; maxStreak: number } | null>;
  updateUserStreak(userId: number): Promise<{ currentStreak: number; maxStreak: number }>;
}


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

  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    res.json({ response: `I received your message: "${message}". This is a placeholder response.` });
  });

  // Streak endpoints
  app.get('/api/streak', async (req, res) => {
    const userId = 1; // Replace with actual user ID from auth
    const streak = await storage.getUserStreak(userId);
    res.json(streak || { currentStreak: 0, maxStreak: 0 });
  });

  app.post('/api/streak/update', async (req, res) => {
    const userId = 1; // Replace with actual user ID from auth
    const updatedStreak = await storage.updateUserStreak(userId);
    res.json(updatedStreak);
  });

  return httpServer;
}