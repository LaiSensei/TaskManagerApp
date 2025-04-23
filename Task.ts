// Task.ts
export interface Task {
    id: number;
    title: string;
    description: string;
    status: boolean; // true = completed, false = pending
  }