import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrioritizedTask, TaskGroup } from '../types';
import { PriorityGroup } from './PriorityGroup';

interface ResultsViewProps {
  prioritizedTasks: PrioritizedTask[];
  groupTasksByPriority: (tasks: PrioritizedTask[]) => TaskGroup[];
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  prioritizedTasks,
  groupTasksByPriority,
}) => {
  const navigate = useNavigate();

  const handleBackToTasks = () => {
    navigate('/');
  };

  const taskGroups = groupTasksByPriority(prioritizedTasks);

  if (prioritizedTasks.length === 0) {
    return (
      <div className="container">
        <div className="results-section">
          <div className="section-header">
            <h2>
              <i className="fas fa-chart-line"></i> No Results
            </h2>
            <button className="btn btn-secondary" onClick={handleBackToTasks}>
              <i className="fas fa-arrow-left"></i> Back to Tasks
            </button>
          </div>
          <div className="empty-state">
            <i className="fas fa-exclamation-circle"></i>
            <p>No prioritized results to display. Please prioritize some tasks first.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="results-section">
        <div className="section-header">
          <h2>
            <i className="fas fa-chart-line"></i> Prioritized Results
          </h2>
          <button className="btn btn-secondary" onClick={handleBackToTasks}>
            <i className="fas fa-arrow-left"></i> Back to Tasks
          </button>
        </div>

        <div className="results-container">
          {taskGroups.map((group) => (
            <PriorityGroup
              key={group.priority}
              priority={group.priority}
              tasks={group.tasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
