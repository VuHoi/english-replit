export interface Progress {
  module: string;
  completed: number;
  total: number;
}

export function saveProgress(userId: number, moduleId: string, progress: Progress): void {
  const key = `progress_${userId}_${moduleId}`;
  localStorage.setItem(key, JSON.stringify(progress));
}

export function getProgress(userId: number, moduleId: string): Progress | null {
  const key = `progress_${userId}_${moduleId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}
