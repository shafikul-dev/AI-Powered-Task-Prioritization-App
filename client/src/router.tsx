import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { TaskManager } from './components/TaskManager';
import { ResultsView } from './components/ResultsView';
import { useTasksContext } from './context/TasksContext';
import { LoadingOverlay } from './components/LoadingOverlay';

const RootLayout: React.FC = () => {
  const { isLoading } = useTasksContext();
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Outlet />
    </>
  );
};

const TaskPage: React.FC = () => {
  const {
    tasks,
    isLoading,
    error,
    addTask,
    removeTask,
    editTask,
    clearAllTasks,
    prioritizeTasks,
    clearError,
  } = useTasksContext();

  return (
    <TaskManager
      tasks={tasks}
      isLoading={isLoading}
      error={error}
      onAddTask={addTask}
      onRemoveTask={removeTask}
      onEditTask={editTask}
      onClearAll={clearAllTasks}
      onPrioritize={prioritizeTasks}
      onClearError={clearError}
    />
  );
};

const ResultsPage: React.FC = () => {
  const { prioritizedTasks, groupTasksByPriority } = useTasksContext();
  return (
    <ResultsView
      prioritizedTasks={prioritizedTasks}
      groupTasksByPriority={groupTasksByPriority}
    />
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div className="container">Something went wrong.</div>,
    children: [
      { index: true, element: <TaskPage /> },
      { path: 'results', element: <ResultsPage /> }
    ]
  }
]);


