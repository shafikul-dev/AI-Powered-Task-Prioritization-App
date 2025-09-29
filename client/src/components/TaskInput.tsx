import React from 'react';

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  value,
  onChange,
  onAdd,
  onKeyPress,
  disabled = false,
}) => {
  return (
    <div className="input-group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Enter a new task..."
        maxLength={200}
        disabled={disabled}
        className="task-input"
      />
      <button
        className="btn btn-primary"
        onClick={onAdd}
        disabled={disabled || !value.trim()}
      >
        <i className="fas fa-plus"></i> Add Task
      </button>
    </div>
  );
};
