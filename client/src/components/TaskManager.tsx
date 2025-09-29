import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';




interface TaskManagerProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onAddTask: (text: string) => boolean;
  onRemoveTask: (id: string) => void;
  onEditTask: (id: string, text: string) => void;
  onClearAll: () => void;
  onPrioritize: () => void;
  onClearError: () => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  isLoading,
  error,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onClearAll,
  onPrioritize,
  onClearError,
}) => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    const success = onAddTask(newTask);
    if (success) {
      setNewTask('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handlePrioritize = async () => {

    await onPrioritize();
    navigate('/results');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
      onClearAll();
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>
          <i className="fas fa-brain"></i> Smart Task Prioritizer
        </h1>
        <p>Add your tasks and let AI help you prioritize them intelligently</p>
      </header>

      <main className="main-content">
        {/* Task Input Section */}
        <section className="task-input-section">
          <TaskInput
            value={newTask}
            onChange={setNewTask}
            onAdd={handleAddTask}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <div className="task-count">
            <span>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
          </div>
        </section>

        {/* Task List Section */}
        <section className="task-list-section">
          <div className="section-header">
            <h2>
              <i className="fas fa-list"></i> Your Tasks
            </h2>
            <div className="task-actions">
              <button
                className="btn btn-success"
                onClick={handlePrioritize}
                disabled={tasks.length === 0 || isLoading}
              >
                <i className="fas fa-magic"></i> Prioritize Tasks
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleClearAll}
                disabled={tasks.length === 0 || isLoading}
              >
                <i className="fas fa-trash"></i> Clear All
              </button>
            </div>
          </div>

          <TaskList
            tasks={tasks}
            onRemove={onRemoveTask}
            onEdit={onEditTask}
            disabled={isLoading}
          />
        </section>

        {/* Loading State removed */}
      </main>
    </div>
  );
};
