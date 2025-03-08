import {
  type User,
  type InsertUser,
  type VocabularyProgress,
  type GrammarProgress,
  type SpeakingProgress,
  type WritingProgress,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Progress tracking
  getVocabularyProgress(userId: number): Promise<VocabularyProgress[]>;
  updateVocabularyProgress(userId: number, wordId: string, learned: boolean): Promise<void>;

  getGrammarProgress(userId: number): Promise<GrammarProgress[]>;
  updateGrammarProgress(userId: number, lessonId: string, completed: boolean, score: number): Promise<void>;

  getSpeakingProgress(userId: number): Promise<SpeakingProgress[]>;
  updateSpeakingProgress(userId: number, exerciseId: string, completed: boolean, recordingUrl?: string): Promise<void>;

  getWritingProgress(userId: number): Promise<WritingProgress[]>;
  updateWritingProgress(userId: number, promptId: string, submission: string, feedback?: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vocabProgress: Map<string, VocabularyProgress>;
  private grammarProgress: Map<string, GrammarProgress>;
  private speakingProgress: Map<string, SpeakingProgress>;
  private writingProgress: Map<string, WritingProgress>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.vocabProgress = new Map();
    this.grammarProgress = new Map();
    this.speakingProgress = new Map();
    this.writingProgress = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getVocabularyProgress(userId: number): Promise<VocabularyProgress[]> {
    return Array.from(this.vocabProgress.values())
      .filter(p => p.userId === userId);
  }

  async updateVocabularyProgress(userId: number, wordId: string, learned: boolean): Promise<void> {
    const key = `${userId}-${wordId}`;
    this.vocabProgress.set(key, {
      id: this.currentId++,
      userId,
      wordId,
      learned,
      lastReviewed: new Date(),
    });
  }

  async getGrammarProgress(userId: number): Promise<GrammarProgress[]> {
    return Array.from(this.grammarProgress.values())
      .filter(p => p.userId === userId);
  }

  async updateGrammarProgress(userId: number, lessonId: string, completed: boolean, score: number): Promise<void> {
    const key = `${userId}-${lessonId}`;
    this.grammarProgress.set(key, {
      id: this.currentId++,
      userId,
      lessonId,
      completed,
      score,
    });
  }

  async getSpeakingProgress(userId: number): Promise<SpeakingProgress[]> {
    return Array.from(this.speakingProgress.values())
      .filter(p => p.userId === userId);
  }

  async updateSpeakingProgress(userId: number, exerciseId: string, completed: boolean, recordingUrl?: string): Promise<void> {
    const key = `${userId}-${exerciseId}`;
    this.speakingProgress.set(key, {
      id: this.currentId++,
      userId,
      exerciseId,
      completed,
      recording: recordingUrl || null,
    });
  }

  async getWritingProgress(userId: number): Promise<WritingProgress[]> {
    return Array.from(this.writingProgress.values())
      .filter(p => p.userId === userId);
  }

  async updateWritingProgress(userId: number, promptId: string, submission: string, feedback?: string): Promise<void> {
    const key = `${userId}-${promptId}`;
    this.writingProgress.set(key, {
      id: this.currentId++,
      userId,
      promptId,
      submission,
      feedback: feedback || null,
    });
  }
}

export const storage = new MemStorage();