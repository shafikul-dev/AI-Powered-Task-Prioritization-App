import React, { createContext, useContext } from 'react';
import { useTasks } from '../hooks/useTasks';

type TasksContextValue = ReturnType<typeof useTasks>;

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useTasks();
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export function useTasksContext(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasksContext must be used within TasksProvider');
  return ctx;
}


