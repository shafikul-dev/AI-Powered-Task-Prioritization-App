import React from 'react';
import { PrioritizedTask, Priority } from '../types';

interface PriorityGroupProps {
  priority: Priority;
  tasks: PrioritizedTask[];
}

export const PriorityGroup: React.FC<PriorityGroupProps> = ({ priority, tasks }) => {
  const getPriorityIcon = (priority: Priority): string => {
    const icons = {
      'High': 'fa-exclamation-triangle',
      'Medium': 'fa-clock',
      'Low': 'fa-check-circle',
    };
    return icons[priority] || 'fa-circle';
  };

  const getPriorityColor = (priority: Priority): string => {
    const colors = {
      'High': 'priority-high',
      'Medium': 'priority-medium',
      'Low': 'priority-low',
    };
    return colors[priority] || 'priority-medium';
  };

  return (
    <div className={`priority-group ${getPriorityColor(priority)}`}>
      <div className="priority-header">
        <i className={`fas ${getPriorityIcon(priority)}`}></i>
        {priority} Priority ({tasks.length} task{tasks.length !== 1 ? 's' : ''})
      </div>
      <div className="priority-tasks">
        {tasks.map((task, index) => (
          <div key={index} className="result-task fade-in">
            <div className="task-info">
              <div className="task-text-result">{task.task}</div>
              <span className="task-category">{task.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
