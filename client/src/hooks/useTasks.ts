import { useState, useEffect, useCallback, useRef } from 'react';
import { Task, PrioritizedTask, TaskGroup } from '../types';
import { taskApi } from '../services/api';

const STORAGE_KEY = 'smartTasks';
const RESULTS_STORAGE_KEY = 'smartTasksResults';

export const useTasks = () => {
  // Hydrate synchronously from localStorage to avoid overwriting on first render
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [prioritizedTasks, setPrioritizedTasks] = useState<PrioritizedTask[]>(() => {
    try {
      const stored = localStorage.getItem(RESULTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track hydration complete to avoid unnecessary initial writes (defensive)
  const hydratedRef = useRef(false);
  useEffect(() => { hydratedRef.current = true; }, []);

  // Save tasks to localStorage whenever tasks change (post-hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
    catch (error) { console.warn('Failed to save tasks to localStorage:', error); }
  }, [tasks]);

  // Save prioritized results whenever they change (post-hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    try { localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(prioritizedTasks)); }
    catch (error) { console.warn('Failed to save prioritized tasks to localStorage:', error); }
  }, [prioritizedTasks]);

  const addTask = useCallback((text: string) => {
    if (!text.trim()) {
      setError('Please enter a task description.');
      return false;
    }

    if (text.length > 200) {
      setError('Task description is too long. Please keep it under 200 characters.');
      return false;
    }

    // Check for duplicates
    if (tasks.some(task => task.text.toLowerCase() === text.toLowerCase())) {
      setError('This task already exists in your list.');
      return false;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => [...prev, newTask]);
    setError(null);
    return true;
  }, [tasks]);

  const removeTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const editTask = useCallback((taskId: string, newText: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, text: newText.trim() }
        : task
    ));
  }, []);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
    setPrioritizedTasks([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(RESULTS_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }, []);

  const prioritizeTasks = useCallback(async () => {
    if (tasks.length === 0) {
      setError('No tasks to prioritize. Please add some tasks first.');
      return;
    }

    setIsLoading(true);
    console.log("checking loading is true");
    setError(null);

    try {
      const taskTexts = tasks.map(task => task.text);
      const response = await taskApi.prioritizeTasks(taskTexts);
      
      if (response.success) {
        setPrioritizedTasks(response.tasks);
      } else {
        throw new Error('Failed to prioritize tasks');
      }
    } catch (error: any) {
      console.error('Prioritization error:', error);
      setError(error.message || 'Failed to prioritize tasks');
    } finally {
      console.log("checking loading is faslse here")
      setIsLoading(false);
    }
  }, [tasks]);







  const groupTasksByPriority = useCallback((tasks: PrioritizedTask[]): TaskGroup[] => {
    const groups: { [key: string]: PrioritizedTask[] } = {
      'High': [],
      'Medium': [],
      'Low': []
    };

    tasks.forEach(task => {
      const priority = task.priority || 'Medium';
      if (groups[priority]) {
        groups[priority].push(task);
      }
    });

    return Object.entries(groups)
      .filter(([_, tasks]) => tasks.length > 0)
      .map(([priority, tasks]) => ({
        priority: priority as 'High' | 'Medium' | 'Low',
        tasks
      }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    tasks,
    prioritizedTasks,
    isLoading,
    error,
    addTask,
    removeTask,
    editTask,
    clearAllTasks,
    prioritizeTasks,
    groupTasksByPriority,
    clearError,
  };
};
