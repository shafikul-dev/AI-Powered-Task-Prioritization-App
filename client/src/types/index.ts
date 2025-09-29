export interface Task {
  id: string;
  text: string;
  createdAt: string;
}

export interface PrioritizedTask {
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
}

export interface PrioritizeResponse {
  success: boolean;
  tasks: PrioritizedTask[];
  originalCount: number;
  processedAt: string;
}

export interface ApiError {
  success: false;
  error: string;
}

export type Priority = 'High' | 'Medium' | 'Low';

export interface TaskGroup {
  priority: Priority;
  tasks: PrioritizedTask[];
}
