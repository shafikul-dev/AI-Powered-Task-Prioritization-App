import React, { useState } from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onRemove: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  disabled?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onRemove,
  onEdit,
  disabled = false,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSave = (id: string) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave(editingId!);
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <i className="fas fa-clipboard-list"></i>
          <p>No tasks yet. Add some tasks to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item fade-in">
          <div className="task-content">
            {editingId === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => handleSave(task.id)}
                className="edit-input"
                autoFocus
                maxLength={200}
              />
            ) : (
              <div className="task-text" onClick={() => handleEdit(task)}>
                {task.text}
              </div>
            )}
          </div>
          <div className="task-actions-item">
            {editingId === task.id ? (
              <>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleSave(task.id)}
                  disabled={disabled}
                >
                  <i className="fas fa-check"></i>
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleCancel}
                  disabled={disabled}
                >
                  <i className="fas fa-times"></i>
                </button>
              </>
            ) : (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onRemove(task.id)}
                disabled={disabled}
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
